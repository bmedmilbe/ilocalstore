import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { location } from "@utils/data";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

//internal import
import { UserContext } from "@context/UserContext";
import CollectionServices from "@services/CollectionServices";

const Footer = ({}) => {
  const {
    state: { user },
  } = useContext(UserContext);
  // const [collections, setCollections] = useState(
  //   CollectionServices.getShowingCollection()
  // );
  // //

  // useEffect(async () => {
  //   setCollections(await collections);
  // }, []);

  const [collections, setCollections] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    CollectionServices.getShowingCollection().then((data) => {
      setCollections(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!collections) return <p>No profile data</p>;
  // console.log(collections);
  return (
    <div className="pb-16 lg:pb-0 xl:pb-0 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 lg:py-16 justify-between">
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              Company
            </h3>
            <ul className="text-sm flex flex-col space-y-3">
              <li className="flex items-baseline">
                <Link href="/about-us">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    About Us
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href="/contact-us">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    Contact us
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href="#">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    Careers
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href="#">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    Latest news
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              Top Category
            </h3>
            <ul className="text-sm lg:text-15px flex flex-col space-y-3">
              {collections.map((collection) => {
                const link = "/search?collection=" + collection.title;
                return (
                  <li className="flex items-baseline">
                    <Link href={link}>
                      <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                        {collection.title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              My Account
            </h3>
            <ul className="text-sm lg:text-15px flex flex-col space-y-3">
              <li className="flex items-baseline">
                <Link href={`${user?.email ? "/user/dashboard" : "#"}`}>
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    Dashboard
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href={`${user?.email ? "/user/my-orders" : "#"}`}>
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    My Orders
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href={`${user?.email ? "/user/dashboard" : "#"}`}>
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    Recent Orders
                  </a>
                </Link>
              </li>
              <li className="flex items-baseline">
                <Link href={`${user?.email ? "/user/update-profile" : "#"}`}>
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    Updated Profile
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link href="/">
              <a className="mr-3 lg:mr-12 xl:mr-12" rel="noreferrer">
                <Image
                  width={110}
                  height={40}
                  src="/logo/logo-color.svg"
                  alt="logo"
                />
              </a>
            </Link>
            <p className="leading-7 font-sans text-sm text-gray-600 mt-3">
              <span>
                {location.address}, <br /> United Kingdown
              </span>
              <br />
              <span>Tel: {location.contact}</span>
              <br />
              <span>Email: {location.email}</span>
            </p>
          </div>
        </div>

        <hr className="hr-line"></hr>

        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 bg-gray-50 shadow-sm border border-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-8 items-center justify-between">
            <div className="col-span-1">
              <span className="text-base leading-7 font-medium block mb-2 pb-0.5">
                Follow Us
              </span>
              <ul className="text-sm flex">
                <li className="flex items-center mr-3 transition ease-in-out duration-500">
                  <Link href="https://www.facebook.com">
                    <a
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <FacebookIcon size={34} round />
                    </a>
                  </Link>
                </li>
                <li className="flex items-center  mr-3 transition ease-in-out duration-500">
                  <Link href="https://twitter.com">
                    <a
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <TwitterIcon size={34} round />
                    </a>
                  </Link>
                </li>
                <li className="flex items-center mr-3 transition ease-in-out duration-500">
                  <Link href="https://www.pinterest.com">
                    <a
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <PinterestIcon size={34} round />
                    </a>
                  </Link>
                </li>
                <li className="flex items-center  mr-3 transition ease-in-out duration-500">
                  <Link href="https://www.linkedin.com">
                    <a
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <LinkedinIcon size={34} round />
                    </a>
                  </Link>
                </li>
                <li className="flex items-center  mr-3 transition ease-in-out duration-500">
                  <Link href="https://www.whatsapp.com">
                    <a
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <WhatsappIcon size={34} round />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-1 text-center hidden lg:block md:block">
              <p className="text-base leading-7 font-medium block">
                Call Us Today!
              </p>
              <h5 className="text-2xl font-bold text-emerald-500 leading-7">
                +012345-67900
              </h5>
            </div>
            <div className="col-span-1 hidden lg:block md:block">
              <ul className="lg:text-right">
                <li className="px-1 mb-2 md:mb-0 transition hover:opacity-80 inline-flex">
                  <Image
                    width={274}
                    height={85}
                    className="w-full"
                    src="/payment-method/payment-logo.png"
                    alt="payment method"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 flex justify-center py-4">
        <p className="text-sm text-gray-500 leading-6">
          Copyright 2023 @{" "}
          <Link href="#">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500"
            >
              Malanza
            </a>
          </Link>
          , All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
