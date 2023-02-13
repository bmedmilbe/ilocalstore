import React, { useContext, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//internal import
import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import { SidebarContext } from "@context/SidebarContext";
import ShopServices from "@services/ShopService";
import Link from "next/link";

const ShopCarousel = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { data, error } = useAsync(() => ShopServices.getShops());
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleShopClick = (shop) => {
    router.push(
      `/search?Shop=${shop.toLowerCase().replace("&", "").split(" ").join("-")}`
    );
    setIsLoading(!isLoading);
  };

  return (
    <>
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={8}
        navigation={true}
        allowTouchMove={true}
        loop={true}
        breakpoints={{
          // when window width is >= 640px
          375: {
            width: 375,
            slidesPerView: 2,
          },
          // when window width is >= 768px
          414: {
            width: 414,
            slidesPerView: 3,
          },
          // when window width is >= 768px
          660: {
            width: 660,
            slidesPerView: 4,
          },

          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 6,
          },

          // when window width is >= 768px
          991: {
            width: 991,
            slidesPerView: 8,
          },

          // when window width is >= 768px
          1140: {
            width: 1140,
            slidesPerView: 9,
          },
          1680: {
            width: 1680,
            slidesPerView: 10,
          },
          1920: {
            width: 1920,
            slidesPerView: 10,
          },
        }}
        modules={[Navigation]}
        className="mySwiper category-slider my-10"
      >
        {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : (
          <div>
            {data?.map((shop, i) => (
              <SwiperSlide key={i + 1} className="group">
                {/* <div
                  onClick={() => handleShopClick(shop.name)}
                  className="text-center cursor-pointer p-3 bg-white rounded-lg"
                >
                  <div className="bg-white p-2 mx-auto w-10 h-10 rounded-full shadow-md">
                    <Image
                      alt={shop.name}
                      src={"/cta/cta-bg-1.jpg"}
                      // src={shop.icon}
                      width={35}
                      height={35}
                    />
                  </div>

                  <h3 className="text-xs text-gray-600 mt-2 font-serif group-hover:text-emerald-500">
                    {shop.name}
                  </h3>
                </div> */}

                <div
                  key={shop.id}
                  className="mx-auto w-full relative rounded-lg overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-xl"
                >
                  <Link href={"/search?category=fresh-vegetable"}>
                    <a className="block">
                      <Image
                        layout="responsive"
                        width={550}
                        height={234}
                        src={"/cta/cta-bg-1.jpg"}
                        alt={shop.name}
                        className="object-cover"
                      />
                      <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full text-center justify-center">
                        <div className="pt-4">
                          <h2 className="font-serif text-base sm:text-lg md:text-lg lg:text-lg font-semibold text-gray-100">
                            {shop.name} <br />
                            <span className="text-lg sm:text-2xl md:text-2xl lg:text-2xl font-bold text-white">
                              {"Fresh & Natural"}
                            </span>
                          </h2>
                          <p className="text-sm font-sans text-gray-50">
                            Weekend discount offer
                          </p>
                          <button className="hidden sm:block lg:block text-xs mx-auto leading-6 font-serif font-medium mt-4 px-4 py-1 bg-green-500 text-center rounded-full text-white hover:bg-emerald-600">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </div>
        )}
        <button ref={prevRef} className="prev">
          <IoChevronBackOutline />
        </button>
        <button ref={nextRef} className="next">
          <IoChevronForward />
        </button>
      </Swiper>
    </>
  );
};

export default React.memo(ShopCarousel);