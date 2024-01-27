import instance from "../Interceptor/Interceptor";

const GetUserApi = async (
  pageNumber,
  rowOfPage,
  FilterByActive,
  role,
  searchData
) => {
  const rowOfPageQuery = `RowsOfPage=${rowOfPage}`;
  const isActive = FilterByActive ? `IsActiveUser=${FilterByActive}` : "";
  const roleId = role ? `roleId=${role}` : "";
  const searchQuery = searchData ? `Query=${searchData}` : "";

  try {
    const result = await instance.get(
      `/User/UserMannage?PageNumber=${pageNumber}&${roleId}&${rowOfPageQuery}&${isActive}&${searchQuery}`
    );
    return result;
  } catch (err) {
    console.log(err.response);
    return [];
  }
};

export { GetUserApi };
