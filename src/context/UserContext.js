import ShopServices from "@services/ShopService";
import UserServices from "@services/UserServices";
import Cookies from "js-cookie";
import React, { createContext, useReducer } from "react";

export const UserContext = createContext();
let value;

const initialState = {
  user: getUser(),
  userShops: UserServices.getJWT() ? getMyStores() : [],
  userCustomer: UserServices.getJWT() ? getUserCustomer() : null,
  shippingAddress: Cookies.get("shippingAddress")
    ? JSON.parse(Cookies.get("shippingAddress"))
    : { adress: "leve-leve" },
  couponInfo: Cookies.get("couponInfo")
    ? JSON.parse(Cookies.get("couponInfo"))
    : {},
};

export async function getUser() {
  try {
    return await (UserServices.getJWT() ? UserServices.getCurrentUser() : null);
  } catch (ex) {
    console.log("Error getting user!");
    return [];
    // console.log();
  }
}

export async function getUserCustomer() {
  try {
    return await (UserServices.getJWT()
      ? UserServices.getCurrentCustomer()
      : null);
  } catch (ex) {
    console.log("Error getting user customer!");
    return [];
    // console.log();
  }
}

export async function getMyStores() {
  try {
    if (UserServices.getJWT()) {
      return await ShopServices.getMyShops();
    }
    return [];
  } catch (ex) {
    console.log("Error getting shopp!");
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, user: action.payload };

    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "SAVE_SHIPPING_ADDRESS":
      return { ...state, shippingAddress: action.payload };

    case "SAVE_COUPON":
      return { ...state, couponInfo: action.payload };
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
