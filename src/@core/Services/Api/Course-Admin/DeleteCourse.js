import instance from "../Interceptor/Interceptor";

const DeleteCourse = async (body) => {
  try {
    const res = await instance.delete("/Course/DeleteCourse", { data: body });
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default DeleteCourse;
