import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

import { notifyError, notifySuccess } from "@utils/toast";
import CartServices from "@services/CartServices";

const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const [products, setProducts] = useState([]);
  const { removeItem, addItem, items, updateItemQuantity } = useCart();

  useEffect(() => {
    const products = sessionStorage.getItem("products");
    setProducts(JSON.parse(products));
  }, []);

  const handleAddItem = async (product) => {
    CartServices.addItem(product, 1);
    // console.log(product);
    const items = await CartServices.getCartItems();
    const element = items.filter((i) => i.product_shop.id === product.id)[0];
    // console.log(element);
    if (element) {
      const newItem = {
        ...element,
        id: element.product_shop.id,
      };
      newItem.price = newItem.discount
        ? (newItem.price * (100 - newItem.discount)) / 100
        : newItem.price;
      addItem(newItem, item);
      notifySuccess(
        `${item} ${element.product_shop.product.name} added to cart!`
      );
    } else {
      console.log("item not added to cart!");
      // notifyError(` item not added to cart!`);
    }
    // CartServices.updateItemQuantity(product.id, 1);
  };
  const updt = async (product, quantity, decrease = false) => {
    const newItem = await CartServices.addItem(
      product,
      decrease ? quantity - 1 : quantity
    );

    const items = await CartServices.getCartItems();
    const element = items.filter((i) => i.product_shop.id === product.id)[0];
    if (element) {
      const newItem = {
        ...element,
        id: element.product_shop.id,
      };
      if (decrease) {
        updateItemQuantity(product.id, quantity);
      } else {
        addItem(newItem, item);
      }
    }
  };

  const handleIncreaseQuantity = (product) => {
    try {
      updt(product, product.quantity + 1);
      notifySuccess(
        `${item} ${product.product_shop.product.name} added to cart!`
      );
    } catch (ex) {
      console.log("item not added to cart!");

      // notifyError(` item not added to cart!`);
    }
  };
  const handleDecreaseQuantity = (product) => {
    try {
      updt(product, product.quantity - 1, true);
      notifySuccess(
        `${item} ${product.product_shop.product.name} removed from cart!`
      );
    } catch (ex) {
      notifyError(` item not removed to cart!`);
    }
  };
  const handleRemoveItem = (product) => {
    const result = products?.find((p) => p.id === product.id);
    if (result) {
      CartServices.deleteItem(product);
      removeItem(product.id);
    }
  };

  return {
    handleAddItem,
    setItem,
    item,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveItem,
  };
};

export default useAddToCart;
