import instance from "../Interceptor/Interceptor";

const GetCourseBySortAndSearch = async (
  rowOfPage,
  sortData,
  searchData,
  pageNumber
) => {
  const rowOfPageQuery = `RowsOfPage=${rowOfPage}`;
  const sortingQuery = sortData
    ? `SortingCol=${sortData[0]}&SortType=${sortData[1]}`
    : "";
  const searchQuery = searchData ? `Query=${searchData}` : "";

  try {
    const res = await instance.get(
      `/Course/CourseList?PageNumber=${pageNumber}&${rowOfPageQuery}&${sortingQuery}&${searchQuery}`
    );
    return res;
  } catch (error) {
    console.log(error.response);
    return 0;
  }
};

export default GetCourseBySortAndSearch;
