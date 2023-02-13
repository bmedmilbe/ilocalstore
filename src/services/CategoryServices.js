import requests from "./httpServices";

const CategoryServices = {
  getShowingCategory() {
    try {
      return requests.get("/category/show");
    } catch (ex) {
      console.log("Trying to get category!");
    }
  },
};

export default CategoryServices;
