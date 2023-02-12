import requests from "./httpServices";

const apiEndpoint = "/store/addresses";

const AddressServices = {
  async getAddresses() {
    return await requests.get(`${apiEndpoint}`);
  },

  saveAddress(address) {
    if (address.id) {
      const body = { ...address };
      delete body.id;
      return requests.put(productUrl(address.id), body);
    }

    return requests.post(`${apiEndpoint}/`, address);
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

  deleteProduct(productId) {
    return requests.delete(productUrl(productId));
  },
};

export default AddressServices;
