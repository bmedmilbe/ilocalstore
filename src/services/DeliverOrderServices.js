import requests from "./httpServices";
const apiEndpoint = "/store/deliverorders";
const DeliverOrderServices = {
  async getDeliverOrders() {
    return await requests.get(`${apiEndpoint}`);
  },
  async updateStatus(orderId, body) {
    return await requests.patch(`/store/orderfordeliver/${orderId}/`, body);
  },

  async addOrder(body) {
    // console.log(body);
    return await requests.post(`${apiEndpoint}/`, body);
  },

  createPaymentIntent(body) {
    return requests.post("/order/create-payment-intent", body);
  },

  // async getOrderByUser({ page = 1, limit = 8 }) {
  //   return await requests.get(`/store/orders?limit=${limit}&page=${page}`);
  // },

  async getOrderByUser() {
    return await requests.get(`/store/orders`);
  },

  async getOrderById(id) {
    return requests.get(`${apiEndpoint}/${id}`);
  },
};

export default DeliverOrderServices;
