import { createContext, useContext, useState } from "react";

const UserListAdminContext = createContext();

const UserProvider = ({ children }) => {
  const [allUser, setAllUser] = useState();
  const [rowOfPage, setRowOfPage] = useState(10);
  const [FilterByActive, setFilterByActive] = useState("");
  const [role, setRole] = useState("");
  const [SearchDatas, setSearchDatas] = useState("");

  return (
    <UserListAdminContext.Provider
      value={{
        allUser,
        setAllUser,
        rowOfPage,
        setRowOfPage,
        FilterByActive,
        setFilterByActive,
        role,
        setRole,
        SearchDatas,
        setSearchDatas,
      }}
    >
      {children}
    </UserListAdminContext.Provider>
  );
};

export default UserProvider;
export const useMyUserListAdmin = () => useContext(UserListAdminContext);
