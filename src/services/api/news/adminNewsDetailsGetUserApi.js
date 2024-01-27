import instance from "../../../@core/Services/Api/Interceptor/Interceptor";

const AdminNewsDetailsGetUserApi = async (value) => {
  try {
    const response = await instance.get(`/User/UserDetails/${value}`);

    return response;
  } catch (error) {
    return false;
  }
};

export { AdminNewsDetailsGetUserApi };
