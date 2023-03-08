import React, { useState } from "react";
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
import OrderChangeStatus from "./OrderChangeStatus";
import TimeAgo from "@component/timeago/TimeAgo";

const DeliverHistory = ({ deliverOrder, index }) => {
  const [order, setOrder] = useState(deliverOrder.order);
  return (
    <>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          {index}. <TimeAgo date={deliverOrder.order.created_at} />
          {/* {dayjs(deliverOrder.order.created_at).format("D/MM/YYYY H:mm")} */}
        </span>
      </td>

      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="  flex items-center justify-center">
          <ul>
            Collect:
            <hr />
            {deliverOrder?.order.items.map((item, index) =>
              item.quantity > 0 ? (
                <li key={index}>
                  {item.quantity} {item.product_shop.product.name} <br />
                  from: {item.product_shop.shop.house_number}{" "}
                  {item.product_shop.shop.street},{" "}
                  {item.product_shop.shop.post_code}
                  <br />
                </li>
              ) : (
                ""
              )
            )}
            <hr />
            Deliver to: <hr />
            {deliverOrder?.order.deliver_address.house_number}{" "}
            {deliverOrder?.order.deliver_address.street},{" "}
            {deliverOrder?.order.deliver_address.post_code}
          </ul>
        </span>
      </td>

      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        {/* <OrderStatus order={deliverOrder} /> */}
        <OrderChangeStatus setOrder={setOrder} order={order} />
      </td>
    </>
  );
};

export default DeliverHistory;
