import React from "react";

const OrderTable = ({ items }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-100 text-serif text-sm">
      {items?.map((item, i) => (
        <tr key={i}>
          <th className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
            {i + 1}{" "}
          </th>
          <td className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
            {item.product_shop.product.name}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center">
            {item.quantity}{" "}
          </td>
          <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">
            £{item.price}.00{" "}
          </td>

          <td className="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500">
            £{item.quantity * item.price}.00
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrderTable;
