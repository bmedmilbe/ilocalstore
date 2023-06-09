import { useContext } from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

//internal import
import useAddToCart from "@hooks/useAddToCart";
import { SidebarContext } from "@context/SidebarContext";
import CartServices from "@services/CartServices";

const CartItem = ({ item }) => {
  const {} = useCart();
  const { closeCartDrawer } = useContext(SidebarContext);
  const { handleRemoveItem, handleIncreaseQuantity, handleDecreaseQuantity } =
    useAddToCart();

  // const handleDecreaseItemQuantity = (item) => {
  //   console.log({ item });
  //   handleDecreaseQuantity(item);
  // };
  // const handleIncreaseItemQuantity = (item) => {
  //   console.log({ item });
  //   handleIncreaseQuantity(item);
  // };

  // const handleUpdateItemQuantity = (id, quantity) => {
  //   console.log({ id, quantity });
  //   CartServices.addItem({ product_shop_id: id, quantity: quantity });
  //   updateItemQuantity(id, quantity);
  // };
  // const handleRemoveItem = (item) => {
  //   console.log({ item });

  //   CartServices.deleteItem(item);
  //   removeItem(id);
  // };

  return (
    <div className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0">
      <div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4">
        <img
          key={item.product_shop_id}
          src={item.product_shop?.product?.image}
          width={40}
          height={40}
          alt={item.product_shop?.product.name}
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <Link href={`/product/${item.product_shop?.slug}`}>
          <a
            onClick={closeCartDrawer}
            className="truncate text-sm font-medium text-gray-700 text-heading line-clamp-1"
          >
            {item.product_shop?.product.name}
          </a>
        </Link>
        <span className="text-xs text-gray-400 mb-1">
          Item Price £{item.price}
        </span>
        <div className="flex items-center justify-between">
          <div className="font-bold text-sm md:text-base text-heading leading-5">
            <span>£{(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div className="h-8 w-22 md:w-24 lg:w-24 flex flex-wrap items-center justify-evenly p-1 border border-gray-100 bg-white text-gray-600 rounded-md">
            <button onClick={() => handleDecreaseQuantity(item)}>
              <span className="text-dark text-base">
                <FiMinus />
              </span>
            </button>
            <p className="text-sm font-semibold text-dark px-1">
              {item.quantity}
            </p>
            <button onClick={() => handleIncreaseQuantity(item)}>
              <span className="text-dark text-base">
                <FiPlus />
              </span>
            </button>
          </div>
          <button
            onClick={() => handleRemoveItem(item)}
            className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
