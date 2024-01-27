import instance from "../Interceptor/Interceptor";

const DeleteUser = async (body) => {
  try {
    const res = await instance.delete(`/User/DeleteUser`, { data: body });
    return res;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default DeleteUser;
