import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";

//internal import
import UserServices from "@services/UserServices";
import { UserContext } from "@context/UserContext";
import { notifyError, notifySuccess } from "@utils/toast";
import { collapseToast } from "react-toastify";
import CartServices from "@services/CartServices";
import CustomerAddressServices from "@services/CustomerAddressServices";

const useAddressSubmit = (setModalOpen) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const prefix = "hkUYGuygyIUUYuygu";
  const tokenKey = "token";
  const refreshKey = "refresh";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [postCode, setPostCode] = useState(null);

  useEffect(async () => {
    CartServices.getCart()
      .then((res) => {
        console.log(res);
        if (res.address) {
          // console.log(res.address.postCode);
          setPostCode(res.address.post_code);
          setSelectedAddress(res.address.id);
        }
      })
      .catch((err) => {
        console.log(err);
        // notifyError(err ? err.response?.data.detail : err.message);
        // setLoading(false);
      });

    CustomerAddressServices.getCustomerAddresses()
      .then((res) => {
        setAddresses(res);
      })
      .catch((err) => {
        console.log(err.response);
        // notifyError(err ? err.response.data.detail : err.message);
        // setLoading(false);
      });
  }, [false]);

  const registerNewAddress = (addressLine, postCode) => {
    const addressBody = {
      street: addressLine,
      post_code: postCode,
    };

    CustomerAddressServices.saveAddress(addressBody)
      .then((res) => {
        const body = { address: res.id };
        CartServices.updateAddress(body)
          .then((res) => {
            setSelectedAddress(body.address);
            setPostCode(addressBody.post_code);

            setLoading(false);
            setModalOpen(false);
            notifySuccess("Address was successfuly setted");
          })
          .catch((err) => {
            console.log(err.response);
            // notifyError(err ? err.response?.data.detail : err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err.response);
        // notifyError(err ? err.response.data.detail : err.message);
        setLoading(false);
      });
  };

  const handleSetAddress = (idAddress, postCode) => {
    CartServices.updateAddress({ address: idAddress })
      .then((res) => {
        // console.log(postCode);
        setPostCode(postCode);
        setSelectedAddress(idAddress);
        notifySuccess("Address was successfuly setted");
        // setModalOpen(false);
      })
      .catch((err) => {
        console.log(err.response);
        notifyError(err ? err.response?.data.detail : err.message);
        // setLoading(false);
      });
  };

  const submitHandler = ({ addressLine, postCode }) => {
    setLoading(true);

    if (addressLine && postCode) {
      registerNewAddress(addressLine, postCode);
    }
  };

  return {
    handleSubmit,
    submitHandler,
    register,
    errors,
    loading,
    addresses,
    selectedAddress,
    postCode,
    handleSetAddress,
  };
};

export default useAddressSubmit;
