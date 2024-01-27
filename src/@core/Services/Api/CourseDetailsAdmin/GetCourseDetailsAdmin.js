import instance from "../Interceptor/Interceptor";

const GetCourseDetailsAdmin = async (cid) => {
  try {
    const res = await instance.get(`/Course/${cid}`);
    return res;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default GetCourseDetailsAdmin;
