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
          We can shipping this item{" "}
          <span className="font-semibold">by today</span> for you!{" "}
        </p>
      </li>
      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiHome />
        </span>
        <p className="font-sans leading-5 text-sm text-gray-500">
          Home delivery within <span className="font-semibold">few hours</span>
        </p>
      </li>

      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiMapPin />
        </span>
        <p className="font-sans leading-5 text-sm text-gray-500">
          {/* <span className="font-semibold">
            {product.shop.name}, {product.shop.street},{" "}
            {product.shop.post_code.toUpperCase()}
          </span> */}
          <span className="font-semibold">
            iLocalStore, Wychnwood, {"LU2 7HU".toUpperCase()}
          </span>
        </p>
      </li>
    </ul>
  );
};

export default Card;
