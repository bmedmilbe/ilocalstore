import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";

import { useCart } from "react-use-cart";

//internal import
import { SidebarContext } from "@context/SidebarContext";

const StickyCategory = () => {
  const { totalItems, cartTotal } = useCart();
  const { toggleCategoryDrawer } = useContext(SidebarContext);

  return (
    <button
      aria-label="Cart"
      onClick={toggleCategoryDrawer}
      className="absolute"
    >
      <div className="left-0 w-35 float-left fixed top-2/4 bottom-2/4 align-middle shadow-lg cursor-pointer z-30 hidden lg:block xl:block">
        <div className="flex flex-col items-center justify-center bg-indigo-50 rounded-tr-lg p-2 text-gray-700">
          <span className="text-2xl mb-1 text-emerald-600">
            {/* <IoBagHandleOutline /> */}
            <BiCategoryAlt />
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-emerald-700 p-2 text-white text-base font-serif font-medium rounded-br-lg mx-auto">
          {/* ${cartTotal.toFixed(2)} */}

          <span className="px-2 text-sm font-serif font-medium">
            See Categories
          </span>
        </div>
      </div>
    </button>
  );
};

export default dynamic(() => Promise.resolve(StickyCategory), { ssr: false });
