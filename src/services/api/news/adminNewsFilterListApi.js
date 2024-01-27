import instance from "./../../../@core/Services/Api/Interceptor/Interceptor";

const AdminNewsFilterListApi = async (
  rowOfPage,
  sortData,
  pageNumber,
  searchData,
  isActiveDeactive
) => {
  console.log(rowOfPage, sortData, pageNumber, isActiveDeactive);
  const rowOfPageQuery = `RowsOfPage=${rowOfPage}`;

  const sortingQuery = sortData
    ? `SortingCol=${sortData[0]}&SortType=${sortData[1]}`
    : "";

  const isActiveDeactiveQuery = isActiveDeactive
    ? `IsActive=${isActiveDeactive}`
    : "";
  const searchQuery = searchData ? `Query=${searchData}` : "";

  try {
    const res = await instance.get(
      `/News/AdminNewsFilterList?PageNumber=${pageNumber}&${rowOfPageQuery}&${sortingQuery}&${searchQuery}&${isActiveDeactiveQuery}`
    );
    return res;
  } catch (error) {
    console.log(error.response);
    return 0;
  }
};

export { AdminNewsFilterListApi };
