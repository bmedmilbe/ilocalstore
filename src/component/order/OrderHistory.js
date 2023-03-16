import React from "react";
import dayjs from "dayjs";
import {
  FiCheck,
  FiRefreshCw,
  FiShoppingCart,
  FiSmile,
  FiTruck,
} from "react-icons/fi";
import OrderStatus from "./OrderStatus";
import Link from "next/link";
import TimeAgo from "@component/timeago/TimeAgo";

const OrderHistory = ({ order }) => {
  return (
    <>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          <TimeAgo date={order.created_at} />
          {/* {dayjs(order.created_at).format("MMMM D, YYYY H:mm")} */}
        </span>
      </td>

      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm font-bold">
          £{(order.total * 1.015 + 0.2).toFixed(2)}
        </span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <OrderStatus order={order} />
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="  flex items-center justify-center">
          {" "}
          <FiSmile /> | {order.deliverorder[0].deliver.customer.first_name}{" "}
          {order.deliverorder[0].deliver.customer.last_name}{" "}
        </span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full">
          {/* {order.paymentMethod} */}
          <Link href={`/order/${order.id}`}>View Invoice</Link>
        </span>
      </td>
    </>
  );
};

export default OrderHistory;
