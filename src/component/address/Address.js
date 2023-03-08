import { FiMapPin } from "react-icons/fi";

//internal  import

import InputAddressSet from "@component/form/InputAddressSet";

const Address = ({ setModalOpen }) => {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Set Address</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Set address to improve your experience with iLocalStore
        </p>
      </div>
      <form className="flex flex-col justify-center">
        <InputAddressSet setModalOpen={setModalOpen} Icon={FiMapPin} />
      </form>
    </>
  );
};

export default Address;
