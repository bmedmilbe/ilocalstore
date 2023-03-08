import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";

//internal import
import useAsync from "@hooks/useAsync";
import Dashboard from "@pages/user/dashboard";
import OrderServices from "@services/OrderServices";
import Loading from "@component/preloader/Loading";
import { UserContext } from "@context/UserContext";
import OrderHistory from "@component/order/OrderHistory";
import { SidebarContext } from "@context/SidebarContext";
import MenuDashboard from "@component/user/MenuDashboard";
import DeliverOrderServices from "@services/DeliverOrderServices";
import DeliverHistory from "@component/order/DeliverHistory";
import MyDelivers from "@component/user/MyDelivers";

const DeliverOpen = ({ deliverOrders }) => {
  // console.log(deliverOrders);
  const router = useRouter();
  const {
    state: { user },
  } = useContext(UserContext);
  const { currentPage, handleChangePage, isLoading, setIsLoading } =
    useContext(SidebarContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    DeliverOrderServices.getDeliverOrders()
      .then((res) => {
        // console.log(res);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [currentPage]);
  // const { data, setData } = useState(deliverOrders);
  // useEffect(() => {
  //   setIsLoading(false);
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [data, user]);

  // useEffect(() => {
  //   setIsLoading(false);

  // }, [user]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Dashboard
          title="My Orders"
          description="This is user order history page"
        >
          <div className="overflow-hidden rounded-md font-serif">
            {loading ? (
              <Loading loading={loading} />
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
                <MyDelivers
                  deliverOrders={data?.filter(
                    (deliverOrder) => deliverOrder.order.shipping_status !== "C"
                  )}
                />
              </div>
            )}
          </div>
        </Dashboard>
      )}
    </>
  );
};

export default DeliverOpen;

// export const getServerSideProps = async (context) => {
//   const { query } = context.query;

//   let deliverOrders = await DeliverOrderServices.getDeliverOrders();

//   // try {
//   //   deliverOrders = await DeliverOrderServices.getDeliverOrders();
//   //   if (query) {
//   //     if (query === "open")
//   //       deliverOrders = deliverOrders?.filter(
//   //         (deliverOrder) => deliverOrder.order.shipping_status !== "C"
//   //       );
//   //     if (query === "close")
//   //       deliverOrders = deliverOrders?.filter(
//   //         (deliverOrder) => deliverOrder.order.shipping_status === "C"
//   //       );
//   //   }
//   // } catch (ex) {}

//   return {
//     props: {
//       deliverOrders,
//     },
//   };
// };
