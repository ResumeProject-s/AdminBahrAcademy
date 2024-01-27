import instance from "../../Interceptor/Interceptor";

const AddUser = async (body) => {
  try {
    const result = await instance.post(`/User/CreateUser`, body);
    return result;
  } catch (err) {
    console.log(err.response);
    return [];
  }
};

export { AddUser };
