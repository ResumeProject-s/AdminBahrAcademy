import instance from "../Interceptor/Interceptor";

const GetReservedCourses = async (CourseId) => {
  try {
    const res = await instance.get(`/CourseReserve/${CourseId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default GetReservedCourses;
