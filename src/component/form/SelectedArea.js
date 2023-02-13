import React from "react";
import Label from "@component/form/Label";

const SelectedArea = ({
  data,
  register,
  defaultValue,
  name,
  label,
  type,
  placeholder,
  Icon,
}) => {
  return (
    <>
      <Label label={label} />
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
              <Icon />{" "}
            </span>
          </div>
        )}
        <select
          // onChange={onChange}
          name={name}
          {...register(`${name}`)}
          className={
            Icon
              ? "py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
              : "py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
          }
        >
          {" "}
          {/* {console.log(data)} */}
          <option value={0}>Choose...</option>
          {data.map((item) => (
            <option
              selected={
                item.value.toString() === defaultValue.toString() ? true : false
              }
              value={item.value}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectedArea;
