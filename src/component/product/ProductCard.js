import { useState } from "react";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { IoBagAddSharp, IoAdd, IoRemove } from "react-icons/io5";

import Price from "@component/common/Price";
import Discount from "@component/common/Discount";
import ProductModal from "@component/modal/ProductModal";
import CartServices from "@services/CartServices";
import useAddToCart from "@hooks/useAddToCart";
import NewUsed from "@component/common/NewUsed";

const ProductCard = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { items, inCart } = useCart();
  const { handleIncreaseQuantity, handleDecreaseQuantity, handleAddItem } =
    useAddToCart();

  // const handleAddItem = (p) => {
  //   const newItem = {
  //     ...p,
  //     id: p.id,
  //   };
  //   newItem.price = newItem.discount
  //     ? (newItem.price * (100 - newItem.discount)) / 100
  //     : newItem.price;
  //   addItem(newItem);
  //   CartServices.addItem({ product_shop_id: p.id, quantity: 1 });
  // };
  // const handleUpdateItemQuantity = (id, quantity) => {
  //   updateItemQuantity(id, quantity);

  //   CartServices.addItem({ product_shop_id: id, quantity: quantity });
  // };

  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
      />

      <div className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative">
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className="relative flex justify-center w-full cursor-pointer"
        >
          {product.quantity <= 0 && (
            <span className="absolute inline-flex items-center justify-center px-2 py-1 bg-red-100 text-red-600 border-0 rounded-full text-xs font-semibold font-serif z-10 left-4 top-4">
              Stock Out
            </span>
          )}
          <Discount product={product} />
          <NewUsed product={product} />
          <Image
            src={product.product.image}
            width={160}
            height={160}
            alt={product.product.name}
            className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
          />
        </div>
        <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
          <div className="relative mb-1">
            <span className="text-gray-400 font-medium text-xs d-block mb-1">
              {product.unit}
            </span>
            <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
              <span className="inline-block text-lg font-semibold text-gray-800">
                {product.product.name}
              </span>
            </h2>
          </div>

          <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
            <Price product={product} card={true} />

            {inCart(product.id) ? (
              <div>
                {items.map(
                  (item) =>
                    item.id === product.id && (
                      <div
                        key={item.id}
                        className="h-13 w-auto flex flex-wrap items-center justify-evenly py-1 px-2 bg-emerald-500 text-white rounded"
                      >
                        <button onClick={() => handleDecreaseQuantity(item)}>
                          <span className="text-dark text-base">
                            <IoRemove />
                          </span>
                        </button>
                        <p className="text-sm text-dark px-1 font-serif font-semibold">
                          {item.quantity}
                        </p>
                        <button
                          onClick={() => handleIncreaseQuantity(item)}
                          // disabled={product.quantity === item.quantity}
                        >
                          <span className="text-dark text-base">
                            <IoAdd />
                          </span>
                        </button>
                      </div>
                    )
                )}{" "}
              </div>
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                // disabled={product.quantity < 1}
                aria-label="cart"
                className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
              >
                {" "}
                <span className="text-xl">
                  <IoBagAddSharp />
                </span>{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
