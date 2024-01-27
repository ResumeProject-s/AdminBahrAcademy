import instance from "../Interceptor/Interceptor";

//
const ActiveAndDeactiveCourses = async (body) => {
  try {
    const res = await instance.put("/Course/ActiveAndDeactiveCourse", body);
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default ActiveAndDeactiveCourses;
