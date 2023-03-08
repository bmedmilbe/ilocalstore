import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//internal import

import { UserContext } from "@context/UserContext";

import MyDeliversC from "@component/user/MyDeliversC";
import { SidebarContext } from "@context/SidebarContext";
import DeliverOrderServices from "@services/DeliverOrderServices";
import Loading from "@component/preloader/Loading";

const Deliver = ({ query }) => {
  const router = useRouter();
  const {
    state: { user },
  } = useContext(UserContext);
  // console.log(products);
  const { currentPage, handleChangePage, isLoading, setIsLoading } =
    useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const deliverOrders = await DeliverOrderServices.getDeliverOrders();

    // console.log(deliverOrders);
    // const orderOrders = [];
    if (query.value === "A") {
      setData(deliverOrders);
      setLoading(false);
    }
    if (query.value === "C") {
      setData(
        deliverOrders.filter(
          (deliverOrder) => deliverOrder.order.shipping_status === "C"
        )
      );
      setLoading(false);
    }
    if (query.value === "N") {
      setData(
        deliverOrders.filter(
          (deliverOrder) => deliverOrder.order.shipping_status !== "C"
        )
      );
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    setIsLoading(false);
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <MyDeliversC data={data} />
      )}
    </>
  );
};

export default Deliver;

export const getServerSideProps = async (context) => {
  let { query } = context.query;

  if (!query) {
    query = {
      value: "A",
      title: "All Delivers",
      description: "All your delivers",
    };
  }
  if (query === "C") {
    query = {
      value: "C",
      title: "All Completed Delivers",
      description: "All your completed delivers",
    };
  }
  if (query === "N") {
    query = {
      value: "N",
      title: "All Incompleted Delivers",
      description: "All your incompleted delivers",
    };
  }
  return {
    props: {
      query,
    },
  };
};
