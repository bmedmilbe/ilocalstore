import requests from "./httpServices";

const apiEndpoint = "/store/customeraddress";

const CustomerAddressServices = {
  async getAddress(id) {
    return await requests.get(`${apiEndpoint}/${id}`);
  },

  async getCustomerAddresses() {
    return await requests.get(`${apiEndpoint}`);
  },

  saveAddress(address) {
    if (address.id) {
      const body = { ...address };
      delete body.id;
      return requests.put(`${apiEndpoint}/${address.id}/`, body);
    }
    return requests.post(`${apiEndpoint}/`, address);
  },

  deleteAddress(productId) {
    return requests.delete(`${apiEndpoint}/${address.id}/`);
  },
};

export default CustomerAddressServices;
