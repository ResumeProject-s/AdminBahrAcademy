import instance from "../Interceptor/Interceptor";

const LoginUser = async (data) => {
  try {
    const res = await instance.post("/Sign/Login", data);
    return res;
  } catch (err) {
    console.log(err.response);
    return 0;
  }
};

export default LoginUser;
