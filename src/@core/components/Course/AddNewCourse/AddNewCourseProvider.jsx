import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddNewCourseContext = createContext();
const AddNewCourseProvider = ({ children }) => {
  const uuid = uuidv4().slice(0, 25);
  const [courseDataObj, setCourseDataObj] = useState({
    CurrentCoursePaymentNumber: 100,
    UniqeUrlString: uuid,
    CoursePrerequisiteId: "",
    TumbImageAddress: "",
    ImageAddress: "",
  });
  const [courseId, setCOurseId] = useState("");
  return (
    <AddNewCourseContext.Provider
      value={{
        courseDataObj,
        setCourseDataObj,
        courseId,
        setCOurseId,
      }}
    >
      {children}
    </AddNewCourseContext.Provider>
  );
};

export default AddNewCourseProvider;

export const useMyCourseObj = () => useContext(AddNewCourseContext);
// const { courseDataObj, setCourseDataObj, courseId, setCOurseId } =
//   useMyCourseObj();
