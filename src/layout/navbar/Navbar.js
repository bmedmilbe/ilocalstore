import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoFlash, IoSearchOutline } from "react-icons/io5";
import {
  FiShoppingCart,
  FiUser,
  FiBell,
  FiMapPin,
  FiAlignLeft,
  FiShoppingBag,
} from "react-icons/fi";

//internal import
import NavbarPromo from "@layout/navbar/NavbarPromo";
import { UserContext } from "@context/UserContext";
import LoginModal from "@component/modal/LoginModal";
import AddressModal from "@component/modal/AddressModal";
import CartDrawer from "@component/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";
import CartServices from "@services/CartServices";
import useAddressSubmit from "@hooks/useAddressSubmit";
import { notifyError } from "@utils/toast";
import CategoryDrawer from "@component/drawer/CategoryDrawer";

const Navbar = ({ user }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const { toggleCartDrawer } = useContext(SidebarContext);
  const { postCode } = useAddressSubmit();
  const { totalItems } = useCart();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search?query=${searchText}`, null, { scroll: false });
      setSearchText("");
    } else {
      router.push(`/ `, null, { scroll: false });
      setSearchText("");
    }
  };

  // useEffect(async () => {
  //   CartServices.getCart()
  //     .then((res) => {
  //       console.log(res);
  //       if (res.address) {
  //         setAddress(res.address.post_code);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       notifyError(err ? err.response?.data.detail : err.message);
  //       // setLoading(false);
  //     });
  // }, [false]);

  return (
    <>
      <CartDrawer />
      <CategoryDrawer />

      {addressModalOpen && (
        <AddressModal
          modalOpen={addressModalOpen}
          setModalOpen={setAddressModalOpen}
        />
      )}
      {modalOpen && (
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}

      <div className="bg-emerald-500 sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="top-bar h-16 lg:h-auto flex items-center justify-between py-4 mx-auto">
            <Link href="/">
              <a className="mr-3 lg:mr-12 xl:mr-12 hidden md:hidden lg:block font-bold text-white">
                {/* <Image
                  width={120}
                  height={120}
                  // src="/logo/logo-color3.png"
                  // src="https://res.cloudinary.com/dybteyiju/image/upload/v1678500741/logo-color_-_Copy_2_byv3cy.png"
                  src="/icon-192x192.png"
                  alt="logo"
                /> */}
                <IoFlash className="w-10 h-10 drop-shadow-xl inline" />
                {/* IoFlash */}
                <span className="inline text-lg"> iLocalStore</span>
              </a>
            </Link>
            {/* <button
              aria-label="Bar"
              onClick={0}
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
            >
              Categories
              <span className="text-xl text-white">
                <FiAlignLeft className="w-6 h-6 drop-shadow-xl" />
              </span>
            </button> */}
            <div className="w-full transition-all duration-200 ease-in-out lg:flex lg:max-w-[520px] xl:max-w-[750px] 2xl:max-w-[900px] md:mx-12 lg:mx-4 xl:mx-0">
              <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
                <div className="flex flex-col mx-auto w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="relative pr-12 md:pr-14 bg-white overflow-hidden shadow-sm rounded-md w-full"
                  >
                    <label className="flex items-center py-0.5">
                      <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        className="form-input w-full pl-5 appearance-none transition ease-in-out border text-input text-sm font-sans rounded-md min-h-10 h-10 duration-200 bg-white focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
                        placeholder="Search for items (e.g. ring, hat, cocacola)"
                      />
                    </label>
                    <button
                      aria-label="Search"
                      type="submit"
                      className="outline-none text-xl text-gray-400 absolute top-0 right-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                    >
                      <IoSearchOutline />
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="hidden md:hidden md:items-center lg:flex xl:block absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                className="pr-5 text-white text-2xl font-bold"
                aria-label="Alert"
              >
                <FiBell className="w-6 h-6 drop-shadow-xl" />
              </button> */}
              <button
                aria-label="Total"
                onClick={toggleCartDrawer}
                className="relative px-5 text-white text-2xl font-bold"
              >
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>
              {/* Profile dropdown */}

              <button
                className="pl-5 text-white text-2xl font-bold"
                aria-label="Login"
              >
                {imageUrl || user?.image ? (
                  <Link href="/user/dashboard">
                    <a className="relative top-1 w-6 h-6">
                      <Image
                        width={29}
                        height={29}
                        src={imageUrl || user?.image}
                        alt="user"
                        className="bg-white rounded-full"
                      />
                    </a>
                  </Link>
                ) : user?.first_name ? (
                  <Link href="/user/dashboard">
                    <a className="leading-none font-bold font-serif block">
                      <FiUser className="w-6 h-6 drop-shadow-xl" />
                    </a>
                  </Link>
                ) : (
                  <span onClick={() => setModalOpen(!modalOpen)}>
                    <FiUser className="w-6 h-6 drop-shadow-xl" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* second header */}
        <NavbarPromo />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
