import instance from "../Interceptor/Interceptor";

const AdminReplyCommentsApi = async (value) => {
  try {
    const response = await instance.post(
      "/Course/AddReplyCourseComment",
      value
    );
    return response;
  } catch (error) {
    return false;
  }
};

export { AdminReplyCommentsApi };
