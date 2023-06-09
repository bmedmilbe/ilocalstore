import { FiLock, FiMail, FiUser } from "react-icons/fi";

//internal import
import Error from "@component/form/Error";
import InputArea from "@component/form/InputArea";
import useLoginSubmit from "@hooks/useLoginSubmit";

const Register = ({ setShowResetPassword, setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit(setModalOpen);

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Signing Up</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Create an account with email
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="John"
                />
                <Error errorName={errors.firstName} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Last name"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                />
                <Error errorName={errors.lastName} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="youremail@gmail.com"
                />
                <Error errorName={errors.email} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  Icon={FiLock}
                />

                <Error errorName={errors.password} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
