import instance from "../../Interceptor/Interceptor";

const UpdateUsers = async (body) => {
  try {
    const res = await instance.put(`/User/UpdateUser`, body);
    return res;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default UpdateUsers;
