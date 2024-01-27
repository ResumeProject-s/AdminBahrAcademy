import instance from "../Interceptor/Interceptor";
import OnSetFormData from "../common/OnSetFormData";

const DeleteGroupe = async (body) => {
  const myData = OnSetFormData(body);
  try {
    const res = await instance.delete("/CourseGroup", { data: myData });
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default DeleteGroupe;
