import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  IoChevronForwardOutline,
  IoChevronDownOutline,
  IoRemoveSharp,
} from "react-icons/io5";

//internal import
import { SidebarContext } from "@context/SidebarContext";

const CollectionCard = ({ title, icon, nested }) => {
  const [show, setShow] = useState(false);
  const showCollection = () => setShow(!show);
  const router = useRouter();
  const { closeCategoryDrawer } = useContext(SidebarContext);

  const handleTag = (tag) => {
    router.push(
      `/search?tag=${tag.tag
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    );
    closeCategoryDrawer();
  };

  return (
    <>
      <a
        onClick={showCollection}
        className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
        role="button"
      >
        <Image
          src={icon}
          width={18}
          height={18}
          alt={title}
          aria-hidden="true"
        />
        <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-emerald-600">
          {title}
          <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
            {show ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
          </span>
        </div>
      </a>
      {show ? (
        <ul className="pl-6 pb-3 pt-1 -mt-1">
          {/* {console.log(nested)} */}
          {nested.map((tag) => (
            <li key={tag.id}>
              <a
                onClick={() => handleTag(tag)}
                className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
              >
                <span className="text-xs text-gray-500 pr-1">
                  <IoRemoveSharp />
                </span>
                {tag.tag}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default CollectionCard;
