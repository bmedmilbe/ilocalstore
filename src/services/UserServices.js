import jwt_decode from "jwt-decode";

import requests from "./httpServices";

const apiLoginEndPoint = "/auth/jwt";
const apiUserEndPoint = "/auth/users";
const prefix = "hkUYGuygyIUUYuygu";
const tokenKey = prefix + "token";
const refreshKey = prefix + "refresh";

const UserServices = {
  async userLogin(body) {
    return await requests.post(`${apiLoginEndPoint}/create`, body);
  },

  async verifyEmailAddress(body) {
    return await requests.post("/user/verify-email", body);
  },

  async userRegister(body) {
    try {
      requests.post(`/auth/users/`, body);
      return await this.userLogin(body);
    } catch (error) {
      return null;
    }
  },

  async signUpWithProvider(body) {
    return await requests.post("/user/signup", body);
  },
  async forgetPassword(body) {
    return await requests.put("/user/forget-password", body);
  },
  async resetPassword(body) {
    return await requests.put("/user/reset-password", body);
  },

  async changePassword(body) {
    return await requests.post("/user/change-password", body);
  },

  async updateUser(id, body) {
    return await requests.put(`/user/${id}`, body);
  },

  getTokenKey() {
    return tokenKey;
  },

  getRefreshKey() {
    return refreshKey;
  },

  getJWT() {
    try {
      return localStorage.getItem(this.getTokenKey());
    } catch (ex) {
      return null;
    }
  },

  async getCurrentUser() {
    try {
      // console.log(jwt);
      return await requests.get(`${apiUserEndPoint}/me`);
    } catch (ex) {
      return null;
    }
  },
};

export default UserServices;
