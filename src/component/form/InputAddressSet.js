import useAddressSubmit from "@hooks/useAddressSubmit";
import CartServices from "@services/CartServices";
import { notifyError, notifySuccess } from "@utils/toast";
import React, { useState } from "react";
import { FiDelete, FiTrash2 } from "react-icons/fi";

const InputAddressSet = ({ Icon, address, setModalOpen }) => {
  const { handleSetAddress, selectedAddress, addresses } =
    useAddressSubmit(setModalOpen);
  // const handleSetAddress = (idAddress) => {
  //   CartServices.updateAddress({ address: idAddress })
  //     .then((res) => {
  //       setChecked(idAddress);
  //       notifySuccess("Address was successfuly setted");
  //       // setModalOpen(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       notifyError(err ? err.response?.data.detail : err.message);
  //       // setLoading(false);
  //     });
  // };
  return (
    <div className="grid grid-cols-6 gap-6">
      {addresses.map((address) => (
        <div key={address.id} className="col-span-6 sm:col-span-6">
          <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
            <label className="cursor-pointer label">
              <div className="flex item-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-3 text-gray-400">
                    <Icon />
                  </span>
                  <h6 className="font-serif font-medium text-sm text-gray-600">
                    {address.street}, {address.post_code}
                  </h6>
                </div>
                {/* {console.log(selectedAddress)} */}
                <input
                  checked={address.id === selectedAddress ? true : false}
                  onClick={() =>
                    handleSetAddress(address.id, address.post_code)
                  }
                  type="radio"
                  value={address.id}
                  name="address"
                  className="form-radio outline-none focus:ring-0 text-emerald-500"
                />
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InputAddressSet;
