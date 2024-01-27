import instance from "../Interceptor/Interceptor";

const GetCourseGroupes = async (CourseId, TeacherId) => {
  try {
    const res = await instance.get(
      `/CourseGroup/GetCourseGroup?TeacherId=${TeacherId}&CourseId=${CourseId}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default GetCourseGroupes;
// /CourseGroup?PageNumber=1&RowsOfPage=10
