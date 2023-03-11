import requests from "./httpServices";

const CollectionServices = {
  async getShowingCollection() {
    try {
      // return [];
      return await requests.get("/store/collections");
    } catch (ex) {
      console.log("Trying to get category!");
    }
  },

  async saveCollection(body) {
    // console.log(body);
    return await requests.post("/store/collections/", body);
  },
};

export default CollectionServices;
