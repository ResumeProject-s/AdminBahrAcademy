import instance from "../Interceptor/Interceptor";

const GetCourseById = async (uId) => {
  try {
    const res = await instance.get(`/Course/${uId}`);
    return res;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default GetCourseById;
