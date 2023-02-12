import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoSearchOutline } from "react-icons/io5";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import {
  MdOutlineAddBusiness,
  MdOutlineStoreMallDirectory,
} from "react-icons/md";
import { GrAddCircle, GrUpdate } from "react-icons/gr";
//internal import
import NavbarPromo from "@layout/navbar/NavbarPromo";
import { UserContext } from "@context/UserContext";
import LoginModal from "@component/modal/LoginModal";
import CartDrawer from "@component/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";
import Card from "@component/order-card/Card";

const Shopmenu = ({ user }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();
  const data = [];
  return (
    <>
      <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Link href={"/shop/dashboard"}>
          <a>
            <Card
              title="My Own Shops"
              Icon={MdOutlineStoreMallDirectory}
              quantity={data?.delivered}
              className="text-emerald-600 bg-emerald-200"
            />
          </a>
        </Link>
        <Link href={"/shop/add-shop"}>
          <a>
            <Card
              title="Register Shop"
              Icon={MdOutlineAddBusiness}
              quantity={data?.totalDoc}
              className="text-red-600  bg-red-200"
            />
          </a>
        </Link>
        <Link href={"/shop/add-product"}>
          <a>
            <Card
              title="Add Product to sell"
              Icon={GrAddCircle}
              quantity={data?.pending}
              className="text-orange-600 bg-orange-200"
            />
          </a>
        </Link>
        <Link href={"/shop/updata-product"}>
          <a>
            <Card
              title="Update Products"
              Icon={GrUpdate}
              quantity={data?.processing}
              className="text-indigo-600 bg-indigo-200"
            />
          </a>
        </Link>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Shopmenu), { ssr: false });
