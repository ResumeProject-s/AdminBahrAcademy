import instance from "../../../@core/Services/Api/Interceptor/Interceptor";

const AdminActiveDeactiveNewsApi = async (value) => {
  try {
    const response = await instance.put("/News/ActiveDeactiveNews", value);

    return response;
  } catch (error) {
    return false;
  }
};

export { AdminActiveDeactiveNewsApi };
