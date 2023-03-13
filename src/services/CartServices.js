// import http from "./httpService";

import requests from "./httpServices";
// import { apiUrl, storeUrl } from "../config.json";
const apiEndpoint = "/store/carts";
const prefix = "hkUYGuygyIUUYuygu";
const cartKey = prefix + "cartKey";

const CartServices = {
  // getShowingShops() {
  //   return this.getShops();
  // },

  async createCart() {
    return await requests.post(`${apiEndpoint}/`, {});
  },
  async createNewCart() {
    const data = await this.createCart();
    // console.log(data);
    localStorage.setItem(cartKey, data.id);
  },
  async getCartKey() {
    if (!localStorage.getItem(cartKey)) {
      const data = await this.createCart();
      console.log(data);
      localStorage.setItem(cartKey, data.id);
    }
    // try {
    //   // return data.id;
    //   return
    // } catch (ex) {
    //   const data = this.createCart();
    //   localStorage.setItem(cartKey, data.id);
    // }

    return localStorage.getItem(cartKey);
  },

  async getCart() {
    try {
      const cartId = await this.getCartKey();
      // console.log(cartId);
      return requests.get(`${apiEndpoint}/${cartId}`);
    } catch (ex) {
      return ex;
    }
  },

  async getCartItems() {
    try {
      const cartId = await this.getCartKey();

      return requests.get(`${apiEndpoint}/${cartId}/cartitems`);
    } catch (ex) {
      return ex;
    }
  },

  async createPaymentIntent(body) {
    const cartId = await this.getCartKey();

    return requests.post(`${apiEndpoint}/${cartId}/secret/`, body);
  },

  async getCartItem(item) {
    try {
      const cartId = await this.getCartKey();

      return requests.get(`${apiEndpoint}/${cartId}/cartitems/${item.id}`);
    } catch (ex) {
      return ex;
    }
  },

  async deleteItem(item) {
    const cartId = await this.getCartKey();

    return requests.post(`${apiEndpoint}/${cartId}/cartitems/`, {
      product_shop_id: item.product_shop.id,
      quantity: 0,
    });
  },

  async addItem(item, quantity) {
    const cartId = await this.getCartKey();
    return requests.post(`${apiEndpoint}/${cartId}/cartitems/`, {
      product_shop_id: item.id,
      quantity,
    });
  },

  async updateAddress(address) {
    console.log(address);
    const cartId = await this.getCartKey();
    // console.log(cartId);
    return requests.patch(`${apiEndpoint}/${cartId}/`, address);
  },
};

export default CartServices;
