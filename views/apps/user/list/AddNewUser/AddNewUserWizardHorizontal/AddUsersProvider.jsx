import { createContext, useContext, useState } from "react";
const AddUserContext = createContext();
const AddUserProvider = ({ children }) => {
  const [UsersValue, setUsersValue] = useState([]);
  return (
    <AddUserContext.Provider value={{ UsersValue, setUsersValue }}>
      {children}
    </AddUserContext.Provider>
  );
};
export default AddUserProvider;

export const useAddUserStore = () => {
  return useContext(AddUserContext);
};
