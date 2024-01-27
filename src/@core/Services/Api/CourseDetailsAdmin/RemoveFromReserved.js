import instance from "../Interceptor/Interceptor";

const RemoveFromReserved = async (body) => {
  try {
    const res = await instance.delete("/CourseReserve", { data: body });
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default RemoveFromReserved;
