import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoChevronForwardSharp } from "react-icons/io5";

//internal import
import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import ShopServices from "@services/ShopService";

const FeatureCategory = () => {
  const router = useRouter();
  const { data, error } = useAsync(() => ShopServices.getShops());
  const childrens = ["children1", "children2", "children3"];
  return (
    <>
      {error ? (
        <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
          <span> {error}</span>
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
          {data?.map((shop, i) => (
            <li className="group" key={i + 1}>
              <div
                onClick={() =>
                  router.push(
                    `/search?Category=${shop.name
                      .toLowerCase()
                      .replace("&", "")
                      .split(" ")
                      .join("-")}`
                  )
                }
                className="flex w-full h-full border border-gray-100 shadow-sm bg-white p-4 cursor-pointer transition duration-200 ease-linear transform group-hover:shadow-lg"
              >
                <div className="flex items-center">
                  <div>
                    <Image
                      src={shop.icon}
                      alt={shop.name}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="pl-4">
                    <h3 className="text-sm text-gray-600 font-serif font-medium leading-tight line-clamp-1 group-hover:text-emerald-500">
                      {shop.name}
                    </h3>
                    <ul className="pt-1 mt-1">
                      {/* <li key={children} className="pt-1">
                          <Link
                            href={`/search?category=${children
                              .toLowerCase()
                              .replace("&", "")
                              .split(" ")
                              .join("-")}`}
                          >
                            <a className="flex items-center font-serif text-xs text-gray-400 hover:text-emerald-600 cursor-pointer">
                              <span className="text-xs text-gray-400 hover:text-emerald-600">
                                <IoChevronForwardSharp />
                              </span>
                              {children}
                            </a>
                          </Link>
                        </li> */}

                      {childrens.slice(0, 3).map((children) => (
                        <li key={children} className="pt-1">
                          <Link
                            href={`/search?category=${children
                              .toLowerCase()
                              .replace("&", "")
                              .split(" ")
                              .join("-")}`}
                          >
                            <a className="flex items-center font-serif text-xs text-gray-400 hover:text-emerald-600 cursor-pointer">
                              <span className="text-xs text-gray-400 hover:text-emerald-600">
                                <IoChevronForwardSharp />
                              </span>
                              {children}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FeatureCategory;
