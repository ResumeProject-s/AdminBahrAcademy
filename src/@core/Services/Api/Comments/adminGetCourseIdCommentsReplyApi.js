import instance from "../Interceptor/Interceptor";

const AdminGetCourseIdCommentsReplyApi = async (courseId, commentId) => {
  try {
    const response = instance.get(
      `/Course/GetCourseReplyCommnets/${courseId}/${commentId}`
    );
    return response;
  } catch (error) {
    return false;
  }
};

export { AdminGetCourseIdCommentsReplyApi };
