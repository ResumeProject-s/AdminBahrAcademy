import instance from "../Interceptor/Interceptor";

const AdminGetCourseCommentsAPI = async (pageNumber, rowOfPage, isAccept) => {
  console.log(pageNumber, rowOfPage, isAccept);
  const rowOfPageQuery = `RowsOfPage=${rowOfPage}`;

  // const sortingQuery = sortData
  //   ? `SortingCol=${sortData[0]}&SortType=${sortData[1]}`
  //   : "";
  // const searchQuery = searchData ? `Query=${searchData}` : "";

  // const isActiveDeactiveQuery = isActiveDeactive
  //   ? `IsActive=${isActiveDeactive}`
  //   : "";

  const AcceptQuery = isAccept ? `Accept=${isAccept}` : "";

  try {
    const res = await instance.get(
      `/Course/CommentManagment?PageNumber=${pageNumber}&${rowOfPageQuery}&${AcceptQuery}`
    );
    return res;
  } catch (error) {
    console.log(error.response);
    return 0;
  }
};

export { AdminGetCourseCommentsAPI };
