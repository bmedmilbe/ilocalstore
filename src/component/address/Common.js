import React, { useEffect, useState } from "react";

//internal import
import Address from "@component/address/Address";
import NewAddress from "@component/address/NewAddress";
import CustomerAddressServices from "@services/CustomerAddressServices";
import { notifyError } from "@utils/toast";
import CartServices from "@services/CartServices";

const Common = ({ setModalOpen }) => {
  const [showNewAddress, setShowNewRegister] = useState(false);

  const handleModal = () => {
    setShowNewRegister(!showNewAddress);
  };

  // useEffect(async () => {
  //   CartServices.getCart()
  //     .then((res) => {
  //       console.log(res);
  //       setSelectedAddress(res.address.id);
  //     })
  //     .catch((err) => {
  //       // console.log(err.response);
  //       notifyError(err ? err.response.data.detail : err.message);
  //       // setLoading(false);
  //     });

  //   CustomerAddressServices.getCustomerAddresses()
  //     .then((res) => {
  //       setAddresses(res);
  //     })
  //     .catch((err) => {
  //       // console.log(err.response);
  //       notifyError(err ? err.response.data.detail : err.message);
  //       // setLoading(false);
  //     });
  // }, [false]);

  return (
    <>
      <div className="overflow-hidden bg-white mx-auto">
        {showNewAddress ? (
          <NewAddress setModalOpen={setModalOpen} />
        ) : (
          <Address setModalOpen={setModalOpen} />
        )}

        <div className="text-center text-sm text-gray-900 mt-4">
          <div className="text-gray-500 mt-2.5">
            {showNewAddress
              ? "Already have registed an address?"
              : "Not have address registed?"}
            <button
              onClick={handleModal}
              className="text-gray-800 hover:text-emerald-500 font-bold mx-2"
            >
              {showNewAddress ? "Set Address" : "Register New Address"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
