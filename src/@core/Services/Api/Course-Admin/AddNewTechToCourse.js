import instance from "../Interceptor/Interceptor";

const AddNewTechToCourse = async (cId, body) => {
  try {
    const res = await instance.post(
      `/Course/AddCourseTechnology?courseId=${cId}`,
      body
    );
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default AddNewTechToCourse;
