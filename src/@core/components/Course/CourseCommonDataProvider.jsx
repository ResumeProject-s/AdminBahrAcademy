import { createContext, useContext, useEffect, useState } from "react";
import AddNewCourseDataNeeded from "../../Services/Api/Course-Admin/AddNewCourseDataNeeded";
import MakingListForSelect from "../../Services/Api/common/MakingListForSelect";

//
const CourseSettingContext = createContext();

const CourseCommonDataProvider = ({ children }) => {
  const [Settings, setSettings] = useState();
  const [courseTypeList, setCourseTypeList] = useState([]);
  const [Level, setLevel] = useState([]);
  const [Status, setStatus] = useState([]);
  const [ClassRoom, setClassRoom] = useState([]);
  const [Teacher, setTeacher] = useState([]);
  const [Terms, setTerms] = useState([]);
  const [TechList, setTechList] = useState([]);

  const getAllDatas = async () => {
    const res = await AddNewCourseDataNeeded();
    setSettings(res);
  };

  const setSettingsDatas = () => {
    if (Settings) {
      setCourseTypeList(
        MakingListForSelect(Settings.courseTypeDtos, "id", "typeName")
      );
      setLevel(
        MakingListForSelect(Settings.courseLevelDtos, "id", "levelName")
      );
      setStatus(MakingListForSelect(Settings.statusDtos, "id", "statusName"));
      setClassRoom(
        MakingListForSelect(Settings.classRoomDtos, "id", "classRoomName")
      );
      setTeacher(
        MakingListForSelect(Settings.teachers, "teacherId", "fullName")
      );
      setTerms(MakingListForSelect(Settings.termDtos, "id", "termName"));
      setTechList(
        MakingListForSelect(Settings.technologyDtos, "id", "techName")
      );
    }
  };
  useEffect(() => {
    getAllDatas();
  }, []);

  useEffect(() => {
    setSettingsDatas();
  }, [Settings]);

  return (
    <CourseSettingContext.Provider
      value={{
        courseTypeList,
        Level,
        Status,
        ClassRoom,
        Teacher,
        Terms,
        TechList,
      }}
    >
      {children}
    </CourseSettingContext.Provider>
  );
};

export default CourseCommonDataProvider;
export const useMyCourseSettings = () => useContext(CourseSettingContext);
