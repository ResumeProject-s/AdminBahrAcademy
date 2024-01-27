import { createContext, useContext, useState } from "react";
const UserDetailContext = createContext();
const UserDetailProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState();
  return (
    <UserDetailContext.Provider value={{ UserDetails, setUserDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
};
export default UserDetailProvider;

export const useMyUserDetailstore = () => {
  return useContext(UserDetailContext);
};
