import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IoLockOpenOutline } from "react-icons/io5";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import useAsync from "@hooks/useAsync";
import useFilter from "@hooks/useFilter";
import { userSidebar } from "@utils/data";
import Card from "@component/order-card/Card";
import { getUser, UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import RecentOrder from "@pages/user/recent-order";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
import MenuDashboard from "@component/user/MenuDashboard";
import UserServices from "@services/UserServices";
import { Router } from "next/router";

const Dashboard = ({ title, description, children }) => {
  const router = useRouter();

  const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);
  const {
    state: { user },
  } = useContext(UserContext);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const userLogged = await user;

    if (!userLogged) {
      router.push("/");
      return;
    }
    setUserDetails(userLogged);
    OrderServices.getOrderByUser({})
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
    setIsLoading(false);
  }, [currentPage]);

  const handleLogOut = () => {
    // dispatchEvent({ type: "USER_LOGOUT" });
    // Cookies.remove("user");
    // Cookies.remove("couponInfo");
    UserServices.logout();
    router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={title ? title : "Dashboard"}
          description={description ? description : "This is User Dashboard"}
        >
          <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
              <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
                <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
                  {userSidebar.map((item) => (
                    <span
                      key={item.title}
                      className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                    >
                      <item.icon
                        className="flex-shrink-0 h-4 w-4"
                        aria-hidden="true"
                      />
                      <Link href={item.href}>
                        <a className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                          {item.title}
                        </a>
                      </Link>
                    </span>
                  ))}
                  <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                    <span className="mr-2">
                      <IoLockOpenOutline />
                    </span>{" "}
                    <button
                      onClick={handleLogOut}
                      className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
                    >
                      Logout
                    </button>
                  </span>
                </div>
              </div>
              <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
                {!children && (
                  <div className="overflow-hidden">
                    <h2 className="text-xl font-serif font-semibold mb-5">
                      Dashboard
                    </h2>
                    <MenuDashboard />

                    <RecentOrder data={data} loading={loading} error={error} />
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
