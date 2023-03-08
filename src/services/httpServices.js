import axios from "axios";
import Cookies from "js-cookie";
import UserServices from "./UserServices";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  timeout: 500000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let userInfo, user;

  let jwtToken = UserServices.getJWT();

  // if (Cookies.get("userInfo")) {
  //   userInfo = JSON.parse(Cookies.get("userInfo"));
  // }
  // console.log(jwt);
  return {
    ...config,
    headers: {
      authorization: jwtToken ? `JWT ${jwtToken}` : null,
    },
  };
});

// export function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = `JWT ${jwt}`;
//   axios.defaults.headers.common["Authorization"] = `JWT ${jwt}`;
// }

// console.log(process.env.API_BASE_URL);
const responseBody = (response) => response.data;

const requests = {
  get: (url, body) => instance.get(url, body).then(responseBody),

  post: (url, body, headers) =>
    instance.post(url, body, headers).then(responseBody),

  put: (url, body) => instance.put(url, body).then(responseBody),
  patch: (url, body) => instance.patch(url, body).then(responseBody),
};

export default requests;
