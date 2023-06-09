import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiPhoneCall, FiUser } from "react-icons/fi";

//internal import
import LoginModal from "@component/modal/LoginModal";
import { contactData } from "@utils/data";
import { getUser, UserContext } from "@context/UserContext";
import UserServices from "@services/UserServices";
import useAsync from "@hooks/useAsync";
import AddressModal from "@component/modal/AddressModal";

const NavBarTop = ({ user }) => {
  const {
    state: {},
  } = useContext(UserContext);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  // const [user, setUser] = useState(null);

  // useEffect(async () => {
  //   setUser(await getUser());
  // }, []);

  const handleAddressModal = async () => {
    console.log("check if address is set in the cart");
    if (user.email) {
      // router.push("/user/dashboard");
      console.log("check if address is set in the cart");
    } else {
      setModalOpen(!modalOpen);
    }
  };

  const handleModal = async () => {
    if (user.email) {
      router.push("/user/dashboard");
    } else {
      setModalOpen(!modalOpen);
    }
  };

  return (
    <>
      {addressModalOpen && (
        <AddressModal
          modalOpen={addressModalOpen}
          setModalOpen={setAddressModalOpen}
        />
      )}
      {modalOpen && (
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}

      <div className="hidden lg:block bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="text-gray-700 py-2 font-sans text-xs font-medium border-b flex justify-between items-center">
            <span className="flex items-center">
              <FiPhoneCall className="mr-2" />
              We are available 24/7, Need help? Call Us:{" "}
              <a
                href="tel:+012345609"
                className="font-bold text-emerald-500 ml-1"
              >
                {contactData[0].contact}
              </a>
            </span>

            <div className="lg:text-right flex items-center">
              {/* <Link href="/about-us">
                <a className="font-medium hover:text-emerald-600">About Us</a>
              </Link>
              <span className="mx-2">|</span> */}
              <Link href="/contact-us">
                <a className="font-medium hover:text-emerald-600">Contact Us</a>
              </Link>
              <span className="mx-2">|</span>

              {user ? (
                <button className="font-medium hover:text-emerald-600">
                  {user.email}
                </button>
              ) : (
                <button
                  onClick={handleModal}
                  className="font-medium hover:text-emerald-600"
                >
                  My account
                </button>
              )}

              {!user ? (
                <button
                  onClick={() => setModalOpen(!modalOpen)}
                  className="flex items-center font-medium hover:text-emerald-600"
                >
                  <span className="mr-1">
                    <FiUser />
                  </span>
                  Login
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarTop;
