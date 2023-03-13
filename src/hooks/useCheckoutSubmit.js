import Cookies from "js-cookie";
import * as dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

//internal import
import useAsync from "@hooks/useAsync";
import { getUser, UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import CouponServices from "@services/CouponServices";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerAddressServices from "@services/CustomerAddressServices";
import CartServices from "@services/CartServices";

const useCheckoutSubmit = () => {
  const {
    state: { user, shippingAddress },
    dispatch,
  } = useContext(UserContext);

  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(true);
  const [shippingCost, setShippingCost] = useState(0);

  const [cartId, setCartId] = useState(0);

  const [newShippingAddress, setNewShippingAddress] = useState(0);

  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState("");
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponRef = useRef("");
  const { isEmpty, emptyCart, items, cartTotal } = useCart();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data } = useAsync(CouponServices.getAllCoupons);

  useEffect(() => {
    if (Cookies.get("couponInfo")) {
      const coupon = JSON.parse(Cookies.get("couponInfo"));
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
    }
  }, []);

  // //loggedIn
  // useEffect(async () => {
  //   setUser(await getUser());
  // }, []);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove("couponInfo");
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  useEffect(() => {
    const result = items?.filter((p) => p.type === discountProductType);
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );
    let totalValue = "";
    let subTotal = (cartTotal + shippingCost).toFixed(2);
    let discountAmount = discountProductTotal * (discountPercentage / 100);
    totalValue = subTotal - discountAmount;
    setDiscountAmount(discountAmount);
    setTotal(totalValue);
  }, [cartTotal, shippingCost, discountPercentage]);

  //if not login then push user to home page
  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    setValue("houseNumber", shippingAddress.houseNumber);
    setValue("postCode", shippingAddress.postCode);
    setValue("address", shippingAddress.address);
    setValue("shippingOption", shippingAddress.shippingOption);
    setValue("shippingCost", shippingAddress.shippingCost);
  }, []);

  const newAddress = async (data) => {
    if (
      !data.postCode.startsWith("1") &&
      !data.postCode.startsWith("2") &&
      !data.postCode.startsWith("3")
    ) {
      notifyError("Your post code must be from LU1 to LU3");
      return;
    }

    const addresses = await CustomerAddressServices.getCustomerAddresses();

    const address = addresses.find(
      (address) =>
        address.house_number === data.houseNumber &&
        address.street === data.address &&
        address.post_code === "LU" + data.postCode.toUpperCase()
    );
    if (!address) {
      const body = {
        house_number: data.houseNumber,
        street: data.address,
        post_code: "LU" + data.postCode.toUpperCase(),
      };
      // console.log(body);
      try {
        address = await CustomerAddressServices.saveAddress(body);
      } catch (ex) {
        console.log(ex.response.data.detail);
      }
    }

    return address.id;
  };

  const submitHandler = async (data) => {
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
    Cookies.set("shippingAddress", JSON.stringify(data));
    setIsCheckoutSubmit(true);
    setError("");

    const cart = await CartServices.getCart();
    const address_id = await newAddress(data);
    // console.log(address_id);
    if (!address_id) {
      setIsCheckoutSubmit(false);
      return;
    }

    let orderInfo = {
      cart_id: cart.id,
      deliver_address_id: address_id,
      // contact: data.contact,
      // email: data.email,
      // city: data.city,
      // country: data.country,
      // zipCode: data.zipCode,
      // shippingOption: data.shippingOption,
      // paymentMethod: data.paymentMethod,
      // status: "Pending",
      // cart: items,
      // subTotal: cartTotal,
      // shippingAddress: shippingAddress,
      // shippingCost: shippingCost,
      // discount: discountAmount,
      // total: total,
    };

    if (!stripe || !elements) {
      setIsCheckoutSubmit(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // console.log("error", error);

    if (error && !paymentMethod) {
      setError(error.message);
      setIsCheckoutSubmit(false);
    } else {
      setError("");
      const orderData = {
        ...orderInfo,
        cardInfo: paymentMethod,
      };

      handlePaymentWithStripe(orderData);

      // console.log('cardInfo', orderData);
      return;
    }
    // if (data.paymentMethod === "COD") {
    if (data.paymentMethod === "COD") {
      // console.log(orderInfo);
      OrderServices.addOrder(orderInfo)
        .then((res) => {
          // console.log(res);
          router.push(`/order/${res.id}`);

          CartServices.createNewCart()
            .then((res) => {
              // console.log(res);

              notifySuccess("Your Order Confirmed!");
              // CartServices.createNewCart();
              Cookies.remove("couponInfo");
              sessionStorage.removeItem("products");
              emptyCart();
              setIsCheckoutSubmit(false);
            })
            .catch((err) => {
              err;
              notifyError(err.message);
              setIsCheckoutSubmit(false);
            });
        })
        .catch((err) => {
          err;
          notifyError(err.message);
          setIsCheckoutSubmit(false);
        });
    }
  };

  const handlePaymentWithStripe = async (order) => {
    try {
      // console.log('try goes here!', order);
      const updatedOrder = {
        ...order,
        cartId: order.cart_id,
      };

      // console.log(updatedOrder);

      CartServices.createPaymentIntent(order)
        .then((res) => {
          stripe.confirmCardPayment(res.client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          });
          const orderData = {
            ...order,
            cardInfo: res,
          };
          OrderServices.addOrder({
            cart_id: order.cart_id,
            deliver_address_id: order.deliver_address_id,
          })
            .then((res) => {
              console.log(res);
              router.push(`/order/${res.id}`);

              CartServices.createNewCart()
                .then((res) => {
                  // console.log(res);

                  notifySuccess("Your Order Confirmed!");
                  // CartServices.createNewCart();
                  Cookies.remove("couponInfo");
                  sessionStorage.removeItem("products");
                  emptyCart();
                  setIsCheckoutSubmit(false);
                })
                .catch((err) => {
                  err;
                  notifyError(err.message);
                  setIsCheckoutSubmit(false);
                });
            })
            .catch((err) => {
              console.log(err);
              console.log(err.response?.data);
              notifyError(err ? err?.response?.data?.message : err.message);
              setIsCheckoutSubmit(false);
            });
          // console.log("res", res, "paymentIntent", paymentIntent);
        })

        .catch((err) => {
          console.log(err);
          console.log("err on creating payment intent", err.message);
          notifyError(err ? err?.response?.data?.message : err.message);
          setIsCheckoutSubmit(false);
        });
    } catch (err) {
      console.log("err", err?.message);
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsCheckoutSubmit(false);
    }
  };

  const handleShippingCost = (value) => {
    setShippingCost(value);
  };
  const handleNewShippingAddress = (value) => {
    setNewShippingAddress(value);
  };

  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    const result = data.filter(
      (coupon) => coupon.couponCode === couponRef.current.value
    );

    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    } else {
      notifySuccess(
        `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      );
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch({ type: "SAVE_COUPON", payload: result[0] });
      Cookies.set("couponInfo", JSON.stringify(result[0]));
    }
  };

  return {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    handleNewShippingAddress,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
    user,
  };
};

export default useCheckoutSubmit;
