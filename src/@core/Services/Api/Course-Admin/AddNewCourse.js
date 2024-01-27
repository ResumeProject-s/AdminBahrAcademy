import instance from "../Interceptor/Interceptor";
import OnSetFormData from "../common/OnSetFormData";

const AddNewCourse = async (data) => {
  const body = OnSetFormData(data);
  try {
    const res = await instance.post(`/Course`, body);
    return res;
  } catch (error) {
    console.log(error.response);
    return 0;
  }
};

export default AddNewCourse;
