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
import { UserContext } from "@context/UserContext";
import Uploader from "@component/image-uploader/Uploader";
import { notifySuccess, notifyError } from "@utils/toast";
import useShopSubmit from "@hooks/useShopSubmit";
import InputAreaLock from "@component/form/InputAreaLock";
import ShopServices from "@services/ShopService";

const AddNewShop = ({ shop }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(shop);
  const {
    state: {},
  } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError("Image is required!");
      return;
    }
    setLoading(true);

    // notifySuccess('For demo this feature is disable!');

    const shopData = {
      name: data.name,
      house_number: data.houseNumber,
      street: data.road,
      post_code: "LU1 " + data.postCode,
      image: imageUrl,
      slug: data.name.toLowerCase().replace("&", "").split(" ").join("-"),
    };
    ShopServices.saveShop(shopData)
      .then((res) => {
        if (res) {
          setLoading(false);
          notifySuccess("Shop Successfully Created!");
          Cookies.set("shop", JSON.stringify(res));
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err?.response?.data?.details : err.message);
      });
  };

  useEffect(() => {
    if (store) {
      setValue("name", store.name);
      setValue("houseNumber", store.houseNumber);
      setValue("road", store.road);
      setValue("postCode", store.postCode);
      setImageUrl(store.image);
    }
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">
                Add New Store
              </h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="bg-white space-y-6">
              <div>
                <Label label="Photo" />
                <div className="mt-1 flex items-center">
                  <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="lg:mt-6 mt-4 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-6">
                        <InputArea
                          register={register}
                          label="Store name"
                          name="name"
                          type="text"
                          placeholder="Store name"
                        />
                        <Error errorName={errors.name} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <InputArea
                          register={register}
                          label="House number"
                          name="houseNumber"
                          type="text"
                          placeholder="2 or Flat 2"
                        />
                        <Error errorName={errors.houseNumber} />
                      </div>
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <InputArea
                          register={register}
                          label="Address Road"
                          name="road"
                          type="text"
                          placeholder="Buxton Road"
                        />
                        <Error errorName={errors.road} />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <InputAreaLock
                          register={register}
                          label="Post code for LU1 area"
                          name="postCode"
                          type="text"
                          starter={"LU1"}
                          placeholder="1RE"
                          id={"postCode"}
                          length={3}
                        />
                        <Error errorName={errors.postCode} />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 mt-5 text-left">
                      <button
                        disabled={loading}
                        type="submit"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                      >
                        Add Store
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewShop;
