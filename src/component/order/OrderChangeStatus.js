import React, { useState } from "react";
import dayjs from "dayjs";
import {
  FiCheck,
  FiRefreshCw,
  FiShoppingCart,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";
import Link from "next/link";
import DeliverOrderServices from "@services/DeliverOrderServices";
import { notifyError, notifySuccess } from "@utils/toast";
import { Router } from "next/router";

const OrderChangeStatus = ({ order, setOrder }) => {
  const handleMoveToCollect = () => {
    DeliverOrderServices.updateStatus(order.id, { shipping_status: "M" })
      .then((res) => {
        // console.log(res);
        setOrder(res);
        // setData(res);
        notifySuccess("Status Successfully Updated");
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
      });
  };

  const handleGetFromStore = () => {
    DeliverOrderServices.updateStatus(order.id, { shipping_status: "O" })
      .then((res) => {
        // console.log(res);
        setOrder(res);
        // setData(res);
        notifySuccess("Status Successfully Updated");
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
      });
  };

  const handleDelive = () => {
    DeliverOrderServices.updateStatus(order.id, { shipping_status: "C" })
      .then((res) => {
        // console.log(res);
        setOrder(res);
        // setData(res);
        notifySuccess("Status Successfully Updated");
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
      });
  };

  return (
    <>
      {/* {console.log(data)} */}

      {order.shipping_status === "P" && (
        // findig a deliver to your order
        <button
          onClick={() => handleMoveToCollect(order)}
          className="text-sm bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
        >
          Moving To Collect
        </button>
      )}
      {order.shipping_status === "M" && (
        // deliver collecting your order
        <button
          onClick={() => handleGetFromStore(order)}
          className="text-sm bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
        >
          Collected
        </button>
      )}
      {order.shipping_status === "O" && (
        // deliver coming with you order
        <button
          onClick={() => handleDelive(order)}
          className="text-sm bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
        >
          Delivered
        </button>
      )}

      {order.shipping_status === "C" && (
        // your order completed
        <span className="text-emerald-500  flex items-center justify-center">
          {" "}
          <FiCheck />
          Completed
        </span>
      )}
      {order.shipping_status === "R" && (
        // your order was returned
        <span className="text-red-500  flex items-center justify-center">
          {" "}
          <FiXCircle /> | Canceled
        </span>
      )}
    </>
  );
};

export default OrderChangeStatus;
