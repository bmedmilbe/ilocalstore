import requests from "./httpServices";

const apiEndpoint = "/store/productsinshops";

const ProductServices = {
  getShowingProducts() {
    return this.getProducts();
  },

  getDiscountedProducts() {
    return requests.get(`${slug}/discount`);
  },

  getProductBySlug(slug) {
    return requests.get(`store/productshop/${slug}`);
  },

  getProductMainBySlug(slug) {
    return requests.get(`store/mainproducts/${slug}`);
  },

  productUrl(id) {
    return `${apiEndpoint}/${id}`;
  },

  getProducts() {
    return requests.get("store/productshop/");
  },

  getProduct(productId) {
    return requests.get(productUrl(productId));
  },

  saveProduct(product) {
    // console.log(product);
    if (product.id) {
      const body = { ...product };
      delete body.id;
      return requests.put("/store/products/" + product.id, body);
    }

    return requests.post(`/store/products/`, product);
  },

  deleteProduct(productId) {
    return requests.delete(productUrl(productId));
  },
};

export default ProductServices;
