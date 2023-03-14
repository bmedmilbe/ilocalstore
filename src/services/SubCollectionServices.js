import requests from "./httpServices";

const SubCollectionServices = {
  async getShowingSubCollection() {
    try {
      // return [];
      return await requests.get("/store/subcollections/all");
    } catch (ex) {
      console.log("Trying to get category!");
    }
  },

  async saveSubCollection(body) {
    // console.log(body);
    return await requests.post("/store/subcollections/", body);
  },
};

export default SubCollectionServices;
