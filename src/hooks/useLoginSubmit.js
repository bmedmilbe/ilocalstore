import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";

//internal import
import UserServices from "@services/UserServices";
import { UserContext } from "@context/UserContext";
import { notifyError, notifySuccess } from "@utils/toast";
import { collapseToast } from "react-toastify";

const useLoginSubmit = (setModalOpen) => {
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

  const registerNew = (firstName, lastName, email, password) => {
    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      username: email,
    };
    UserServices.userRegister(body)
      .then((res) => {
        doLogin(email, password);
        // console.log(body);
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err.response);
        notifyError(err ? err.response.data.detail : err.message);
        setLoading(false);
      });
  };

  const doLogin = (username, password) => {
    const cookieTimeOut = 0.5;
    const body = {
      username,
      password,
    };
    // console.log(body);
    UserServices.userLogin(body)
      .then((res) => {
        // console.log(body);
        // console.log(res);
        setLoading(false);
        setModalOpen(false);
        localStorage.setItem(`${prefix}${tokenKey}`, res.access);
        localStorage.setItem(`${prefix}${refreshKey}`, res.refresh);
        router.push(redirect || "/");
        notifySuccess("Login Success!");
        dispatch({ type: "USER_LOGIN", payload: res });

        Cookies.set("userInfo", JSON.stringify(res), {
          expires: cookieTimeOut,
        });
      })
      .catch((err) => {
        console.log(err.response);
        notifyError(err ? err.response.data.detail : err.message);
        setLoading(false);
      });
  };

  const submitHandler = ({
    name,
    email,
    verifyEmail,
    password,
    firstName,
    lastName,
  }) => {
    setLoading(true);

    if (firstName && lastName && email && password) {
      registerNew(firstName, lastName, email, password);
    }

    if (name && email && password) {
      UserServices.verifyEmailAddress({ name, email, password })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err.response.data.message);
        });
    }
    if (verifyEmail) {
      UserServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
          setValue("verifyEmail");
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.detail : err.message);
        });
    }
    if (email && password && !firstName) {
      doLogin(email, password);
    }
  };

  const handleGoogleSignIn = (user) => {
    console.log("google sign in", user);
    // if (user.profileObj.name) {
    //   UserServices.signUpWithProvider({
    //     name: user.profileObj.name,
    //     email: user.profileObj.email,
    //     image: user.profileObj.imageUrl,
    //   })
    //     .then((res) => {
    //       setModalOpen(false);
    //       notifySuccess("Login success!");
    //       router.push(redirect || "/");
    //       dispatch({ type: "USER_LOGIN", payload: res });
    //       Cookies.set("userInfo", JSON.stringify(res), {
    //         expires: cookieTimeOut,
    //       });
    //     })

    //     .catch((err) => {
    //       notifyError(err.message);
    //       setModalOpen(false);
    //     });
    // }
  };

  return {
    handleSubmit,
    submitHandler,
    handleGoogleSignIn,
    register,
    errors,
    GoogleLogin,
    loading,
  };
};

export default useLoginSubmit;
