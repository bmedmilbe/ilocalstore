// import http from "./httpService";

import requests from "./httpServices";
import UserServices from "./UserServices";
// import { apiUrl, storeUrl } from "../config.json";
const apiEndpoint = "/store/shops";
const apiEndpointManage = "/store/shopmanage";
const ShopServices = {
  // getShowingShops() {
  //   return this.getShops();
  // },

  getDiscountedShops() {
    return requests.get("/shops/discount");
  },

  getShopBySlug(slug) {
    return requests.get(`/shops/${slug}`);
  },

  shopUrl(id) {
    return `${apiEndpoint}/${id}`;
  },

  getShops() {
    //console.log(apiEndpoint);
    return requests.get(apiEndpoint);
  },

  getShop(shopId) {
    return requests.get(shopUrl(shopId));
  },

  async getMyStoreBySlug(slug) {
    console.log(slug);
    return await requests.get(`/store/shopmanagebyslug/${slug}`);
  },

  async getMyShops() {
    try {
      if (UserServices.getJWT()) {
        return await requests.get(`${apiEndpointManage}`);
      }
    } catch (ex) {
      return [];
    }
    return [];
  },

  saveShop(shop) {
    if (shop.id) {
      const body = { ...shop };
      delete body.id;
      return requests.put(shopUrl(shop.id), body);
    }
    return requests.post(`${apiEndpointManage}/`, shop);
  },

  deleteShop(shopId) {
    return requests.delete(shopUrl(shopId));
  },

  productShopUrl(id, productId) {
    return `${apiEndpoint}/${id}/products/${productId}`;
  },

  async getShopProducts(shop = -1) {
    return requests.get(apiEndpoint + "/" + shop + "/products");
  },

  getShopProduct(shop, productId) {
    return requests.get(productShopUrl(shop, productId));
  },

  saveShopProduct(shop, product) {
    if (product.id) {
      const body = { ...product };
      delete body.id;
      return requests.put(productShopUrl(shop, product.id), body);
    }

    return requests.post(apiEndpoint + "/" + shop + "/products", product);
  },

  deleteShopProduct(shop, productId) {
    return requests.delete(productShopUrl(shop, productId));
  },
};

export default ShopServices;
