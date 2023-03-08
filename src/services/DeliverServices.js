import requests from "./httpServices";
const apiEndpoint = "/store/delivers";
const DeliverServices = {
  async getDeliverStatemment() {
    return await requests.get(`${apiEndpoint}/statemment`);
  },
};

export default DeliverServices;
