import UserServices from "@services/UserServices";

const useUser = {
  async populateDetails() {
    const user = await (UserServices.getJWT()
      ? UserServices.getCurrentUser()
      : null);

    if (!user) return null;

    return {
      firstName: user.first_name,
      lastName: user.lastName,
      email: user.email,
      username: user.user,
    };
  },
};

export default useUser;
