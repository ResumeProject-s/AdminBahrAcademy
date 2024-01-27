import instance from "../Interceptor/Interceptor";

const DataApi = async () => {
  try {
    const res = await instance.get(`/Report/DashboardReport`);
    return res;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default DataApi;
