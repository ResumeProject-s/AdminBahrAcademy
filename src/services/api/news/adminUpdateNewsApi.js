import instance from "../../../@core/Services/Api/Interceptor/Interceptor";

const AdminUpdateNewsApi = async (value) => {
  try {
    const response = await instance.put("/News/UpdateNews", value);

    return response;
  } catch (error) {
    return false;
  }
};

export { AdminUpdateNewsApi };
