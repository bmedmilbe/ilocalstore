import React from "react";
import { FiTruck, BsFillHouseFill, ImLocation2 } from "react-icons/im";

const InputAddress = ({ register, value, time, cost, handleShippingCost }) => {
  return (
    <div>
      <div className="p-3 card border border-gray-200 bg-white rounded-md">
        <label className="cursor-pointer label">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3 text-gray-400">
                <ImLocation2 />
              </span>
              <div>
                <h6 className="font-serif font-medium text-sm text-gray-600">
                  {value}
                </h6>
              </div>
            </div>
            <input
              onClick={() => handleShippingCost(cost)}
              {...register(`addressOption`, {
                required: `Address is required!`,
              })}
              name="addressOption"
              type="radio"
              value={value}
              className="form-radio outline-none focus:ring-0 text-emerald-500"
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default InputAddress;
