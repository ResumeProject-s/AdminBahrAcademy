import instance from "../Interceptor/Interceptor";

const GetCourseDetailsUsers = async (cid) => {
  try {
    const res = await instance.get(`/Home/GetCourseDetails?CourseId=${cid}`);
    return res;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export default GetCourseDetailsUsers;
