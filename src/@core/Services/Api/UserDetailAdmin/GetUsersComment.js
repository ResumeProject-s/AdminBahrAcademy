import instance from "../Interceptor/Interceptor";

const GetUsersComment = async (ComId, count) => {
  try {
    const result = await instance.get(
      `/Course/CommentManagment?PageNumber=${count}&RowsOfPage=3&userId=${ComId}`
    );
    return result;
  } catch (err) {
    console.log(err.response);
    return [];
  }
};

export { GetUsersComment };
