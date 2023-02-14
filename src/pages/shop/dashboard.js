import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
//internal import
import Layout from "@layout/Layout";
import useAsync from "@hooks/useAsync";
import useFilter from "@hooks/useFilter";

import Card from "@component/order-card/Card";
import { UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import RecentOrder from "@pages/user/recent-order";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
import Shopmenu from "@component/shop/Shopmenu";
import UserMenu from "@component/shop/UserMenu";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import AddNewShop from "@component/shop/AddNewShop";
import ShopServices from "@services/ShopService";

const Dashboard = ({ title, description, children }) => {
  const router = useRouter();
  const {
    dispatch,
    state: { user },
  } = useContext(UserContext);
  const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);

  const [data, setData] = useState({});
  const [shops, setShops] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderServices.getOrderByUser({
      page: currentPage,
      limit: 8,
    })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
    ShopServices.getMyShops()
      .then((res) => {
        setLoading(false);
        setShops(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [currentPage]);

  useEffect(async () => {
    setIsLoading(false);
    if (!user) {
      router.push("/");
    }
  }, [user]);

  // console.log("shop dashbaord");
  // console.log(shops);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={title ? title : "Shop Dashboard"}
          description={description ? description : "This is Shop Dashboard"}
        >
          <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
              <UserMenu />
              <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
                {!children && (
                  <div className="overflow-hidden">
                    <Shopmenu />
                    {shops ? (
                      <div className="w-full grid grid-col gap-4 grid-cols-1 2xl:gap-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
                        {shops.map((shop) => (
                          <div
                            key={shop.id}
                            className="mx-auto w-full relative rounded-lg overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-xl"
                          >
                            <Link href={"/shop/update-shop?slug=" + shop.slug}>
                              <a className="block">
                                <Image
                                  layout="responsive"
                                  width={550}
                                  height={234}
                                  src={shop.image}
                                  alt={shop.name}
                                  className="object-cover"
                                />
                                <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full text-center justify-center">
                                  <div className="pt-4">
                                    <button className="hidden sm:block lg:block text-xs mx-auto leading-6 font-serif font-medium mt-4 px-4 py-1 bg-green-500 text-center rounded-full text-white hover:bg-emerald-600">
                                      Update Status
                                    </button>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <AddNewShop />
                    )}

                    {/*  */}
                  </div>
                )}
                {children}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
