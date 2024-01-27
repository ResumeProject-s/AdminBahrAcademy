import instance from "../../../@core/Services/Api/Interceptor/Interceptor";

const AdminGetNewsWithIdApi = async (param) => {
  try {
    const response = await instance.get(`/News/${param}`);
    return response;
  } catch (error) {
    return false;
  }
};

export { AdminGetNewsWithIdApi };
