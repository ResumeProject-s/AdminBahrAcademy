import instance from "../../../@core/Services/Api/Interceptor/Interceptor";

const AdminAddNewsApi = async (value) => {
  try {
    const response = instance.post("/News/CreateNews", value);
    return response;
  } catch (error) {
    return false;
  }
};

export { AdminAddNewsApi };
