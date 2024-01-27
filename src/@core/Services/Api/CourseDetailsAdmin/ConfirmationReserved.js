import instance from "../Interceptor/Interceptor";

const ConfirmationReserved = async (body) => {
  try {
    const res = await instance.post(`/CourseReserve/SendReserveToCourse`, body);
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default ConfirmationReserved;
