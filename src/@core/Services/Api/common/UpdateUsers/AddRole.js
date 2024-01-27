import instance from "../../Interceptor/Interceptor";

const AddUserRole = async (body) => {
  try {
    const res = await instance.post(`/User/AddUserAccess?Enable=true`, body);
    return res;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default AddUserRole;
