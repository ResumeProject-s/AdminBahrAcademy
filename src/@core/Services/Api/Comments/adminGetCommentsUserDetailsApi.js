import instance from "../Interceptor/Interceptor";

const AdminGetCommentsUserDetailsApi = async (value) => {
  try {
    const response = await instance.get(`/User/UserDetails/${value}`);

    return response;
  } catch (error) {
    return false;
  }
};

export { AdminGetCommentsUserDetailsApi };
