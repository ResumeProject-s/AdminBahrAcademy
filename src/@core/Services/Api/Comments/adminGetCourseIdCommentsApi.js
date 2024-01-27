import instance from "../Interceptor/Interceptor";

const AdminGetCourseIdCommentsApi = async (value) => {
  try {
    const response = await instance.get(`/Course/GetCourseCommnets/${value}`);

    return response;
  } catch (error) {
    return false;
  }
};

export { AdminGetCourseIdCommentsApi };
