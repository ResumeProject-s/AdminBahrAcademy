import instance from "../Interceptor/Interceptor";

const GetAllCourseGroupes = async (pageNum) => {
  try {
    const res = await instance.get(
      `/CourseGroup?PageNumber=${pageNum}&RowsOfPage=7`
    );
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default GetAllCourseGroupes;
