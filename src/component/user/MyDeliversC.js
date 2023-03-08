import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { FiCheck, FiShoppingCart, FiTruck } from "react-icons/fi";
import { MdOutlineStore } from "react-icons/md";

import Card from "@component/order-card/Card";
import { getUser, UserContext } from "@context/UserContext";
import DeliverHistory from "@component/order/DeliverHistory";
import ReactPaginate from "react-paginate";
import DeliverOrderServices from "@services/DeliverOrderServices";
import Loading from "@component/preloader/Loading";
import { IoBagHandle } from "react-icons/io5";
import MenuDashboard from "./MenuDashboard";
import MyDelivers from "./MyDelivers";
import Dashboard from "@pages/user/dashboard";
import { SidebarContext } from "@context/SidebarContext";
import { useRouter } from "next/router";

const MyDeliversC = ({ data }) => {
  const router = useRouter();
  const {
    state: { user },
  } = useContext(UserContext);
  const { currentPage, handleChangePage, isLoading, setIsLoading } =
    useContext(SidebarContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    if (!user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [false]);
  const pageCount = Math.ceil(data?.totalDoc / 8);
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Dashboard>
          <div className="overflow-hidden rounded-md font-serif">
            {isLoading ? (
              <Loading loading={isLoading} />
            ) : error ? (
              <h2 className="text-xl text-center my-10 mx-auto w-11/12 text-red-400">
                {error}
              </h2>
            ) : data?.length === 0 ? (
              <div className="text-center">
                <span className="flex justify-center my-30 pt-16 text-emerald-500 font-semibold text-6xl">
                  <IoBagHandle />
                </span>
                <h2 className="font-medium text-md my-4 text-gray-600">
                  You Have no order Yet!
                </h2>
              </div>
            ) : (
              <div className="flex flex-col">
                <MenuDashboard />
                <h2 className="text-xl font-serif font-semibold mb-5">
                  Delivers to complete
                </h2>
                <MyDelivers deliverOrders={data} />
              </div>
            )}
          </div>
        </Dashboard>
      )}
    </>
  );
};

export default MyDeliversC;
