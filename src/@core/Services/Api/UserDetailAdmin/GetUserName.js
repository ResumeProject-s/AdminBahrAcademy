import instance from "../Interceptor/Interceptor";

const GetUserName = async () => {
  try {
    const res = await instance.get("/SharePanel/GetProfileInfo");
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default GetUserName;
