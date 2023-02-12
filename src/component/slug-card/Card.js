import React from "react";
import {
  FiDollarSign,
  FiHome,
  FiMapPin,
  FiRepeat,
  FiShieldOff,
  FiSun,
  FiTruck,
} from "react-icons/fi";

const Card = ({ product }) => {
  return (
    <ul className="my-0">
      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiTruck />
        </span>
        <p className="font-sans leading-5 text-sm text-gray-500">
          Free shipping apply to all orders over shipping{" "}
          <span className="font-semibold">£100</span>
        </p>
      </li>
      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiHome />
        </span>
        <p className="font-sans leading-5 text-sm text-gray-500">
          Home Delivery within <span className="font-semibold">2 Hour</span>
        </p>
      </li>

      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiMapPin />
        </span>
        <p className="font-sans leading-5 text-sm text-gray-500">
          <span className="font-semibold">
            {product.shop.name}, {product.shop.house_number}{" "}
            {product.shop.street}, Luton, {product.shop.post_code.toUpperCase()}
          </span>
        </p>
      </li>
    </ul>
  );
};

export default Card;
