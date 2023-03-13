import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";

//internal import
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import Dashboard from "@pages/user/dashboard";
import InputArea from "@component/form/InputArea";
import UserServices from "@services/UserServices";
import { getUser, UserContext } from "@context/UserContext";
import Uploader from "@component/image-uploader/Uploader";
import { notifySuccess, notifyError } from "@utils/toast";
import { FiLock } from "react-icons/fi";
import CustomerServices from "@services/CustomerServices";
import InputBank from "@component/form/InputBank";
import DrawerWrapper from "rc-drawer/lib/DrawerWrapper";
import RecentOrder from "./recent-order";
import RecentStatemment from "./recent-stattement";
import DeliverServices from "@services/DeliverServices";
import ShipppingStatemment from "./shipping-stattement";
import MenuDashboard from "@component/user/MenuDashboard";

const DeliverStatemment = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [statemment, setStatemment] = useState(null);
  const [total, setTotal] = useState(null);
  const {
    state: { user },
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    setLoading(true);
    setLoading(false);

    CustomerServices.updateBankDetails({
      sort_code: data.sortCode || null,
      name_in_bank: data.name || null,
      account_number: data.accountNumber || null,
    })
      .then((res) => {
        if (res) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err?.response?.data?.message : err.message);
      });

    // // notifySuccess('For demo this feature is disable!');

    // const userData = {
    //   first_name: data.firstName,
    //   last_name: data.lastName,
    //   phone: data.phone,
    // };
    // UserServices.updateUser(userId, userData)
    //   .then((res) => {
    //     if (res) {
    //       setLoading(false);
    //       notifySuccess("Profile Update Successfully!");
    //       Cookies.set("user", JSON.stringify(res));
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     notifyError(err ? err?.response?.data?.message : err.message);
    //   });
  };

  useEffect(async () => {
    CustomerServices.getCurrentCustomer()
      .then((res) => {
        setCustomer(res);
        // console.log(res);

        setValue("name", res.name_in_bank);
        setValue("sortCode", res.sort_code);
        setValue("accountNumber", res.account_number);
        DeliverServices.getDeliverStatemment()
          .then((res) => {
            // console.log(res);
            const orders = res.deliverorders.map(
              (deliverorder) => deliverorder.order
            );
            // console.log(stores);
            // const orderitems = stores.map((item) => item[0].orderitems);
            // // console.log();
            // const pp = orderitems[0]?.map((item) => item);
            // console.log(pp);
            // console.log(...orders);
            setStatemment(
              [...res.payments, ...orders]
                .sort((a, b) => {
                  if (a.created_at && b.created_at) {
                    return (
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                    );
                  } else if (!a.created_at && b.created_at) {
                    return (
                      new Date(b.created_at).getTime() -
                      new Date(a.made_at).getTime()
                    );
                  } else if (a.created_at && !b.created_at) {
                    return (
                      new Date(b.made_at).getTime() -
                      new Date(a.created_at).getTime()
                    );
                  }
                  return (
                    new Date(b.made_at).getTime() -
                    new Date(a.made_at).getTime()
                  );
                })
                .filter(
                  (item) => item.shipping_price !== 0 || item.amount !== 0
                )
              //https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
            );

            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            notifyError(err ? err?.response?.data?.message : err.message);
          });
      })
      .catch((err) => {
        notifyError(err);
        setLoading(false);
        notifyError(err ? err?.response?.data?.message : err.message);
      });
  }, [false]);

  return (
    <Dashboard
      title="Shipping Statemment"
      description="You can see your shipping statemment"
    >
      <div className="max-w-screen-2xl">
        <MenuDashboard />
        <h2 className="text-xl text-center font-serif font-semibold mb-5">
          Bank Details
        </h2>
        <form>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="lg:mt-6 mt-4 bg-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-2">
                  <InputBank
                    register={register}
                    label="Your name in the Bank"
                    name="name"
                    type="text"
                    value={customer?.name_in_bank}
                    placeholder="John Smith"
                    // updateBank="name"
                    updateBank={handleSubmit(onSubmit)}
                  />
                  <Error errorName={errors.name} />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <InputBank
                    register={register}
                    label="Sort Code"
                    name="sortCode"
                    type="text"
                    placeholder="12-65-43"
                    // updateBank="sortCode"
                    value={customer?.sort_code}
                    updateBank={handleSubmit(onSubmit)}
                  />
                  <Error errorName={errors.sortCode} />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <InputBank
                    register={register}
                    label="Account Number"
                    name="accountNumber"
                    type="number"
                    placeholder="80193985"
                    updateBank={handleSubmit(onSubmit)}
                    value={customer?.account_number}
                  />
                  <Error errorName={errors.accountNumber} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <br />
      <hr />
      <div className="max-w-screen-2xl">
        <h2 className="text-xl text-center font-serif font-semibold mb-5">
          Shippping Statemment
        </h2>
      </div>
      <ShipppingStatemment data={statemment} loading={loading} error={false} />
    </Dashboard>
  );
};

export default dynamic(() => Promise.resolve(DeliverStatemment), {
  ssr: false,
});
