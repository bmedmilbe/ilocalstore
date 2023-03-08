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
import { useRouter } from "next/router";

const UpdateContact = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(0);
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
    setLoading(true);

    // notifySuccess('For demo this feature is disable!');

    UserServices.updateEmail(data)
      .then((res) => {
        setLoading(false);
        notifySuccess("Email Update Successfully!");
        // router.reload(window.location.pathname);
        router.push("/");
        Cookies.set("user", JSON.stringify(res));
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err?.response?.data?.message : err.message);
      });
  };

  // useEffect(async () => {
  //   user = await getUser();
  //   if (user) {
  //     // const user = JSON.parse(Cookies.get("user"));
  //     // setUserId(user.id);
  //     // setValue("current_password", user.first_name);
  //     // setValue("re_new_email");
  //     // setValue("new_email");
  //   }
  // }, []);

  return (
    <Dashboard title="Update-Profile" description="This is edit profile page">
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">
                Update Email
              </h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="lg:mt-6 mt-4 bg-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <InputArea
                    register={register}
                    label="New Email"
                    name="new_email"
                    type="text"
                  />
                  <Error errorName={errors.new_email} />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <InputArea
                    register={register}
                    label="Retype New Email"
                    name="re_new_email"
                    type="text"
                  />
                  <Error errorName={errors.re_new_email} />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <InputArea
                    register={register}
                    label="Current Password"
                    name="current_password"
                    type="password"
                  />
                  <Error errorName={errors.current_password} />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3 mt-5 text-left">
                <button
                  disabled={loading}
                  type="submit"
                  className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                >
                  Update Email
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default dynamic(() => Promise.resolve(UpdateContact), { ssr: false });
