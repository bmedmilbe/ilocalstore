import React from "react";
import dayjs from "dayjs";
import {
  FiCheck,
  FiRefreshCw,
  FiShoppingCart,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

const OrderStatus = ({ order }) => {
  return (
    <>
      {order.shipping_status === "C" && (
        <span className="text-emerald-500  flex items-center justify-center">
          {" "}
          <FiCheck />
          Completed
        </span>
      )}
      {order.shipping_status === "P" && (
        <span className="text-orange-500 flex items-center justify-center ">
          <FiRefreshCw /> | Confirming the shipping
        </span>
      )}
      {order.shipping_status === "M" && (
        <span className="text-yellow-500  flex items-center justify-center">
          <FiTruck /> | Collecting your order
        </span>
      )}
      {order.shipping_status === "O" && (
        <span className="text-yellow-500  flex items-center justify-center">
          <FiTruck /> | Shipping your order
        </span>
      )}
      {order.shipping_status === "R" && (
        <span className="text-red-500  flex items-center justify-center">
          {" "}
          <FiXCircle /> | Canceled
        </span>
      )}
    </>
  );
};

export default OrderStatus;
