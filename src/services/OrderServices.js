import requests from "./httpServices";
const apiEndpoint = "/store/orders";
const OrderServices = {
  async addOrder(body) {
    // console.log(body);
    return await requests.post(`${apiEndpoint}/`, body);
  },

  createPaymentIntent(body) {
    return requests.post("/order/create-payment-intent", body);
  },

  getOrderByUser({ page = 1, limit = 8 }) {
    return requests.get(`/store/orders?limit=${limit}&page=${page}`);
  },
  async getOrderById(id) {
    return requests.get(`${apiEndpoint}/${id}`);
  },
};

export default OrderServices;
