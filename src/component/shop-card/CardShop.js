import React from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import useAsync from "@hooks/useAsync";
import { ctaCardData } from "@utils/data";
import ShopServices from "@services/ShopService";

const CardShop = () => {
  const { data } = useAsync(() =>
    // CategoryServices.getShowingCategory()
    ShopServices.getShops()
  );
  return (
    <>
      {data.map((shop) => (
        // item.url = '/search?category=fresh-vegetable',
        // item.image = '/cta/cta-bg-1.jpg'
        // subTitle: 'Fresh & Natural',
        <div
          key={shop.id}
          className="mx-auto w-full relative rounded-lg overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-xl"
        >
          <Link
            href={
              "/search?shop=" +
              shop.name.toLowerCase().replace("&", "").split(" ").join("-")
            }
          >
            <a className="block">
              <Image
                layout="responsive"
                width={550}
                height={234}
                src={shop.image ? shop.image : ""}
                alt={shop.name}
                className="object-cover"
              />
              <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full text-center justify-center">
                <div className="pt-4">
                  <h2 className="font-serif text-base sm:text-lg md:text-lg lg:text-lg font-semibold text-gray-100">
                    {/* {shop.name} */}
                    {/* <br /> */}
                    {/* <span className="text-lg sm:text-2xl md:text-2xl lg:text-2xl font-bold text-white">
                      {"Fresh & Natural"}
                    </span> */}
                  </h2>
                  <br />
                  {/* <p className="text-sm font-sans text-gray-50">{shop.name}</p> */}
                  <button className="hidden sm:block lg:block text-xs mx-auto leading-6 font-serif font-medium mt-4 px-4 py-1 bg-green-500 text-center rounded-full text-white hover:bg-emerald-600">
                    Shop Now
                  </button>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CardShop;
