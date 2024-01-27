import instance from "../Interceptor/Interceptor";
import OnSetFormData from "../common/OnSetFormData";

const AddNewGroupe = async (vals) => {
  const body = OnSetFormData(vals);
  try {
    const res = await instance.post("/CourseGroup", body);
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default AddNewGroupe;
