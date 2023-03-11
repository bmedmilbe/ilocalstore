import React from "react";

const NewUsed = ({ product, slug }) => {
  return (
    <>
      <span
        className={
          slug
            ? `text-dark text-sm ${
                product.new ? "bg-green-500" : "bg-yellow-500"
              } text-white py-1 px-2 rounded font-medium z-10 right-4 top-11`
            : ` absolute text-dark text-xs  ${
                product.new ? "bg-green-500" : "bg-yellow-500"
              } text-white py-1 px-2 rounded font-medium z-10 right-4 top-11`
        }
      >
        {product.new ? "new" : "used"}
      </span>
    </>
  );
};

export default NewUsed;
