import { IoLockOpenOutline } from "react-icons/io5";

import { userSidebar } from "@utils/data";
import Link from "next/link";
const handleLogOut = () => {
  dispatch({ type: "USER_LOGOUT" });
  Cookies.remove("user");
  Cookies.remove("couponInfo");
  router.push("/");
};

const UserMenu = () => {
  return (
    <>
      <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
        <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
          {userSidebar.map((item) => (
            <span
              key={item.title}
              className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
            >
              <item.icon className="flex-shrink-0 h-4 w-4" aria-hidden="true" />
              <Link href={item.href}>
                <a className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                  {item.title}
                </a>
              </Link>
            </span>
          ))}
          <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
            <span className="mr-2">
              <IoLockOpenOutline />
            </span>{" "}
            <button
              onClick={handleLogOut}
              className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
            >
              Logout
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
