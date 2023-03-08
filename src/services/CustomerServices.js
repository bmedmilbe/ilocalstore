import requests from "./httpServices";

const apiEndpoint = "/store/customers";

const CustomerServices = {
  async getCurrentCustomer() {
    return await requests.get(`${apiEndpoint}/me`);
  },
  async getCustomerStatemment() {
    return await requests.get(`${apiEndpoint}/statemment`);
  },
  async updateBankDetails(body) {
    return requests.patch(`${apiEndpoint}/me/`, body);
  },
};

export default CustomerServices;
