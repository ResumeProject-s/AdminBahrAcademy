import { createContext, useContext, useState } from "react";

const AddNewsContext = createContext();
const AddNewsProvider = ({ children }) => {
  const [addNewsDataObj, setAddNewsDataObj] = useState({
    Title: "",
    GoogleTitle: "",
    GoogleDescribe: "",
    MiniDescribe: "",
    Describe: "",
    Keyword: "",
    IsSlider: "",
    NewsCatregoryId: "",
    Image: "",
  });
  const [newsId, setNewsId] = useState("");
  return (
    <AddNewsContext.Provider
      value={{
        addNewsDataObj,
        setAddNewsDataObj,
        newsId,
        setNewsId,
      }}
    >
      {children}
    </AddNewsContext.Provider>
  );
};

export default AddNewsProvider;

export const useSetAddNewsObj = () => useContext(AddNewsContext);
// const { courseDataObj, setCourseDataObj, newsId, setCOurseId } =
//   useMyCourseObj();
