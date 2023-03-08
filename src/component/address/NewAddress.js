import { FiLock, FiMail, FiUser } from "react-icons/fi";

//internal import
import Error from "@component/form/Error";
import InputArea from "@component/form/InputArea";
import useAddressSubmit from "@hooks/useAddressSubmit";

const NewAddress = ({ setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useAddressSubmit(setModalOpen);

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Register New Address</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Register address to improve your experience with iLocalStore
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        // onSubmit={addAddresses(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Address"
                  name="addressLine"
                  type="text"
                  placeholder="38 Keats Close"
                />
                <Error errorName={errors.addressLine} />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Post Code"
                  name="postCode"
                  type="text"
                  placeholder="EN3 4GH"
                />
                <Error errorName={errors.postCode} />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            Register Address
          </button>
        </div>
      </form>
    </>
  );
};

export default NewAddress;
