import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { FiCheck, FiShoppingCart, FiTruck } from "react-icons/fi";
import { MdOutlineStore } from "react-icons/md";

import Card from "@component/order-card/Card";
import { getUser, UserContext } from "@context/UserContext";
import DeliverHistory from "@component/order/DeliverHistory";
import ReactPaginate from "react-paginate";

const MyDelivers = ({ deliverOrders }) => {
  const {
    state: { user, userCustomer },
  } = useContext(UserContext);
  const [data, setData] = useState({});

  useEffect(async () => {
    if (!user) {
      router.push("/");
    } else {
      setData(await userCustomer);
      // console.log(await userCustomer);
    }
  }, []);
  const pageCount = Math.ceil(deliverOrders?.totalDoc / 8);
  return (
    <>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
            <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="bg-gray-100">
                  <th
                    scope="col"
                    className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                  >
                    OrderTime
                  </th>

                  <th
                    scope="col"
                    className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                  >
                    Shipping Details
                  </th>

                  <th
                    scope="col"
                    className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deliverOrders?.map((deliverOrder, index) => (
                  <tr key={deliverOrder.id}>
                    <DeliverHistory
                      index={index + 1}
                      deliverOrder={deliverOrder}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="paginationOrder">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={(e) => handleChangePage(e.selected + 1)}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                pageClassName="page--item"
                pageLinkClassName="page--link"
                previousClassName="page-item"
                previousLinkClassName="page-previous-link"
                nextClassName="page-item"
                nextLinkClassName="page-next-link"
                breakClassName="page--item"
                breakLinkClassName="page--link"
                containerClassName="pagination"
                activeClassName="activePagination"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDelivers;
