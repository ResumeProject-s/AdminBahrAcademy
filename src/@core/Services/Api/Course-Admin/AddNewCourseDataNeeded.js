import instance from "../Interceptor/Interceptor";

const AddNewCourseDataNeeded = async () => {
  try {
    const res = await instance.get("/Course/GetCreate");
    return res;
  } catch (error) {
    console.log(error.response);
    return 0;
  }
};

export default AddNewCourseDataNeeded;
