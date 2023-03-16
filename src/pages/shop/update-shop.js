import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

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

const UpdateShop = ({ title, description, children }) => {
  const v = useRouter().query.slug;
  const [shops, setShops] = useState([]);
  const [shop, setShop] = useState({});
  const [slug, setSlug] = useState(v);
  // getting the page query parameter
  // Default value is equal to "1"

  useEffect(() => {
    (async () => {
      // console.log(slug);
      const res = await ShopServices.getMyStoreBySlug(slug);
      // console.log(slug);
      setShop(res);
      // This code will be executed only once at begining of the loading of the page
      // It will not be executed again unless you cahnge the page
    })();
  }, [slug]);

  const {
    dispatch,
    state: { user },
  } = useContext(UserContext);
  const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);

  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);
  // useEffect(async () => {
  //   console.log(this.props.query);
  //   ShopServices.getMyStoreBySlug(slug)
  //     .then((res) => {
  //       setLoading(false);
  //       setShops(res);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       setError(err.message);
  //     });
  // }, []);

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
                    {/* {console.log(shop)}; */}
                    <AddNewShop shop={shop} />
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

export default UpdateShop;
