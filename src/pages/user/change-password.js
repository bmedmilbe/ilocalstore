import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

//internal import
import Error from "@component/form/Error";
import Dashboard from "@pages/user/dashboard";
import InputArea from "@component/form/InputArea";
import UserServices from "@services/UserServices";
import { notifyError, notifySuccess } from "@utils/toast";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    UserServices.changePassword(data)
      .then((res) => {
        notifySuccess("Password Successfully Changed");
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
      });
  };

  // useEffect(async () => {
  //   user = await getUser();
  //   if (user) {
  //     // const user = JSON.parse(Cookies.get("user"));
  //     // setUserId(user.id);
  //     // setValue("current_password", user.first_name);
  //     // setValue("re_new_email");
  //     // setValue("email", user.email);
  //   }
  // }, []);

  return (
    <Dashboard
      title="Change-Password"
      description="This is change-password page"
    >
      <h2 className="text-xl font-serif font-semibold mb-5">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid-cols-6 md:gap-6">
          <div className="md:mt-0 md:col-span-2">
            <div className="lg:mt-6 bg-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <InputArea
                    register={register}
                    label="Current Password"
                    name="current_password"
                    type="password"
                    placeholder="Your Current Password"
                  />
                  <Error errorName={errors.current_password} />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <InputArea
                    register={register}
                    label="New Current Password"
                    name="new_password"
                    type="password"
                    placeholder="Your New Current Password"
                  />
                  <Error errorName={errors.new_password} />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <InputArea
                    register={register}
                    label="Retype New Password"
                    name="re_new_password"
                    type="password"
                    placeholder="Your New Password"
                  />
                  <Error errorName={errors.re_new_password} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 text-left">
          <button
            type="submit"
            className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
          >
            Change Password
          </button>
        </div>
      </form>
    </Dashboard>
  );
};

export default ChangePassword;
