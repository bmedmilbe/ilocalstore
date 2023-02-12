import requests from "./httpServices";

const apiEndpoint = "/store/customers";

const CustomerServices = {
  async getCurrentCustomer() {
    return await requests.get(`${apiEndpoint}/me`);
  },

  getProductBySlug(slug) {
    return requests.get(`${apiEndpoint}/${slug}`);
  },

  productUrl(id) {
    return `${apiEndpoint}/${id}`;
  },

  getProduct(productId) {
    return requests.get(productUrl(productId));
  },

  saveProduct(product) {
    if (product.id) {
      const body = { ...product };
      delete body.id;
      return requests.put(productUrl(product.id), body);
    }

    return requests.post(apiEndpoint, product);
  },

  deleteProduct(productId) {
    return requests.delete(productUrl(productId));
  },
};

export default CustomerServices;
