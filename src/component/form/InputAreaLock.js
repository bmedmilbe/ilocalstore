import React from "react";
import Label from "@component/form/Label";

const InputAreaLock = ({
  register,
  defaultValue,
  name,
  label,
  type,
  placeholder,
  Icon,
  starter,
  id,
  length,
}) => {
  return (
    <>
      {/* <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          {starter}
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div> */}

      <Label label={label} />
      <div class="relative flex w-full flex-row-reverse overflow-clip">
        <input
          // class="peer w-full rounded-r-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
          class="py-2 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
          {...register(`${name}`, {
            required: `${label} is required!`,
          })}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          name={name}
          aria-label={label}
          aria-describedby={id}
          maxLength={length}
        />
        <label
          class="flex items-center rounded-l-lg border border-slate-400 bg-slate-50 px-2 text-sm  transition-colors"
          for={id}
        >
          {starter}
        </label>
      </div>
    </>
  );
};

export default InputAreaLock;
