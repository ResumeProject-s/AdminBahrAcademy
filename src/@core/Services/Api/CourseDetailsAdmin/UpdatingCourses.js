import instance from "../Interceptor/Interceptor";
import OnSetFormData from "../common/OnSetFormData";

const UpdatingCourses = async (body) => {
  const data = OnSetFormData(body);
  try {
    const res = await instance.put("/Course", data);
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default UpdatingCourses;
