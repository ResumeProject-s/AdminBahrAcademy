import instance from "../../../@core/Services/Api/Interceptor/Interceptor";

const AdminGetNewsCategoryApi = async () => {
  try {
    const response = await instance.get("/News/GetListNewsCategory");

    return response;
  } catch (error) {
    return false;
  }
};

export { AdminGetNewsCategoryApi };
