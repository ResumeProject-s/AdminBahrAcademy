import instance from "../Interceptor/Interceptor";

const GetUserDetailAdmin = async (uId) => {
  try {
    const res = await instance.get(`/User/UserDetails/${uId}`);
    return res;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default GetUserDetailAdmin;
