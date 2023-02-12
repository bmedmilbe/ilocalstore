import React from "react";

const Tags = ({ product }) => {
  console.log(product.product.tag);
  return (
    <>
      {product.product.tag !== null && (
        <div className="flex flex-row">
          {Array.isArray(product.product.tag)
            ? product.product.tag.map((t, i) => (
                <span
                  key={i + 1}
                  className="bg-gray-50 mr-2 border-0 text-gray-600 rounded-full inline-flex items-center justify-center px-3 py-1 text-xs font-semibold font-serif mt-2"
                >
                  {t}
                </span>
              ))
            : ""}
        </div>
      )}
    </>
  );
};

export default Tags;
