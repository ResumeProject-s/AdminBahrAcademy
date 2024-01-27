import instance from "../Interceptor/Interceptor";

const GetCourseCommentsAdmin = (cId) => {
  try {
    const res = instance.get(`/Course/GetCourseCommnets/${cId}`);
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default GetCourseCommentsAdmin;
