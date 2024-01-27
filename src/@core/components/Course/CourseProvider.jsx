import { createContext, useContext, useState } from "react";

const CourseListAdminContext = createContext();

const CourseProvider = ({ children }) => {
  const [courseList, setCourseList] = useState();
  const [rowOfPage, setRowOfPage] = useState(10);
  const [sortType, setSortType] = useState("");
  const [SearchDatas, setSearchDatas] = useState("");

  return (
    <CourseListAdminContext.Provider
      value={{
        courseList,
        setCourseList,
        rowOfPage,
        setRowOfPage,
        sortType,
        setSortType,
        SearchDatas,
        setSearchDatas,
      }}
    >
      {children}
    </CourseListAdminContext.Provider>
  );
};

export default CourseProvider;
export const useMyCourseListAdmin = () => useContext(CourseListAdminContext);
