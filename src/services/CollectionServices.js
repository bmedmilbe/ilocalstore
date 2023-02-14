import requests from "./httpServices";

const CollectionServices = {
  async getShowingCollection() {
    return await requests.get("/store/collections");
  },
  async saveCollection(body) {
    // console.log(body);
    return await requests.post("/store/collections/", body);
  },
};

export default CollectionServices;
