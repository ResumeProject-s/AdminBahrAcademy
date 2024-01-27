import { createContext, useContext, useState } from "react";
const CourseDetailContext = createContext();
const CourseDetailProvider = ({ children }) => {
  const [courseDetails, setCourseDetails] = useState();
  const [courseDetailsUser, setCourseDetailsUser] = useState();
  const [courseComments, setCourseComments] = useState();
  const [reserved, setReserved] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [dataForUpdate, setDataForUpadate] = useState({});
  const [rerenderState, setRerenderState] = useState(true);
  return (
    <CourseDetailContext.Provider
      value={{
        courseDetails,
        setCourseDetails,
        courseComments,
        setCourseComments,
        reserved,
        setReserved,
        refresh,
        setRefresh,
        courseDetailsUser,
        setCourseDetailsUser,
        dataForUpdate,
        setDataForUpadate,
        rerenderState,
        setRerenderState,
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};
export default CourseDetailProvider;

export const useMyCourseDetailstore = () => {
  return useContext(CourseDetailContext);
};
