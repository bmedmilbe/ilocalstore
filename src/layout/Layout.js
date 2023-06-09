import Head from "next/head";
import { ToastContainer } from "react-toastify";

//internal import
import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import FooterTop from "@layout/footer/FooterTop";
import MobileFooter from "@layout/footer/MobileFooter";
import FeatureCard from "@component/feature-card/FeatureCard";
import NavBarTop from "./navbar/NavBarTop";
import UserServices from "@services/UserServices";

import { useEffect, useState } from "react";
import useUser from "@services/useUser";
import { getUser } from "@context/UserContext";

const Layout = ({ title, description, children }) => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    try {
      setUser(await getUser());
    } catch (ex) {
      console.log("user out");
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="font-sans">
        <Head>
          <title>
            {title
              ? `iLocalStore | ${title}`
              : "iLocalStore - Receive your by same day"}
          </title>
          {description && <meta name="description" content={description} />}
          <link ref="icon" href="/favicon.png" />
        </Head>
        <NavBarTop user={user} />
        <Navbar user={user} />
        <div className="bg-gray-50">{children}</div>
        <MobileFooter user={user} />
        <div className="w-full">
          <FooterTop user={user} />
          <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
            <FeatureCard user={user} />
          </div>
          <hr className="hr-line"></hr>
          <div className="border-t border-gray-100 w-full">
            <Footer user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
