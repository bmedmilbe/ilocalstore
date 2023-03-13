import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import {
  FiCheck,
  FiDollarSign,
  FiRefreshCcw,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi";
import { MdOutlineStore } from "react-icons/md";

import Card from "@component/order-card/Card";
import { getUser, UserContext } from "@context/UserContext";
import DeliverOrderServices from "@services/DeliverOrderServices";

const MenuDashboard = ({}) => {
  const {
    state: { user, userCustomer },
  } = useContext(UserContext);

  const [data, setData] = useState({});
  const [orderDeliver, setOrderDeliver] = useState([]);
  useEffect(async () => {
    setOrderDeliver(await DeliverOrderServices.getDeliverOrders());

    if (!user) {
      router.push("/");
    } else {
      setData(await userCustomer);
      // console.log(await userCustomer);
    }
  }, [false]);

  return (
    <>
      {console.log(orderDeliver)}
      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
        {data.orders?.length > 0 ? (
          <Link href={"/user/my-orders"}>
            <a>
              <Card
                title="My Orders"
                Icon={FiShoppingCart}
                quantity={data.orders?.length}
                className="text-blue-600 bg-blue-200"
              />
            </a>
          </Link>
        ) : (
          ""
        )}

        {orderDeliver?.length > 0 ? (
          <a href={"/user/deliver"}>
            <Card
              title="All Delivers"
              Icon={FiTruck}
              quantity={data.deliver?.deliverorders.length}
              className="text-orange-600 bg-orange-200"
            />
          </a>
        ) : (
          ""
        )}

        {orderDeliver?.length > 0 ? (
          <a href={"/user/deliver?query=N"}>
            <Card
              title="Orders to Complete"
              Icon={FiRefreshCcw}
              quantity={
                orderDeliver.filter(
                  (deliver) => deliver.order.shipping_status !== "C"
                ).length
              }
              className="text-yellow-600 bg-yellow-200"
            />
          </a>
        ) : (
          ""
        )}
        {orderDeliver?.length > 0 ? (
          <a href={"/user/deliver?query=C"}>
            <Card
              title="Completed Orders"
              Icon={FiCheck}
              quantity={
                orderDeliver.filter(
                  (deliver) => deliver.order.shipping_status === "C"
                ).length
              }
              className="text-green-600 bg-green-200"
            />
          </a>
        ) : (
          ""
        )}
        {/* {console.log(data)} */}
        {data.stores?.length > 0 ? (
          <Link href={"/shop/dashboard"}>
            <a>
              <Card
                title="My Stores"
                Icon={MdOutlineStore}
                quantity={data.stores.length}
                className="text-indigo-600 bg-indigo-200"
              />
            </a>
          </Link>
        ) : (
          ""
        )}
        {data.stores?.length > 0 ? (
          <a href={"/user/bank-details"}>
            <Card
              title="Your Store Statemment"
              Icon={FiDollarSign}
              className="text-blue-600 bg-blue-200"
            />
          </a>
        ) : (
          ""
        )}

        {orderDeliver?.length > 0 ? (
          <a href={"/user/deliver-statemment"}>
            <Card
              title="Your Shipping Statemment"
              Icon={FiDollarSign}
              className="text-blue-600 bg-blue-200"
            />
          </a>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MenuDashboard;
