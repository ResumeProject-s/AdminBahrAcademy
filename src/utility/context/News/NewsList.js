import { createContext, useContext, useState } from "react";
const NewsListContext = createContext();
const NewsListProvider = ({ children }) => {
  const [NewsList, setNewsList] = useState({});
  const [rowOfPage, setRowOfPage] = useState(10);
  const [sortType, setSortType] = useState("");
  const [isActiveDeactive, setIsActiveDeactive] = useState();

  return (
    <NewsListContext.Provider
      value={{
        NewsList,
        setNewsList,
        rowOfPage,
        setRowOfPage,
        sortType,
        setSortType,
        isActiveDeactive,
        setIsActiveDeactive,
      }}
    >
      {children}
    </NewsListContext.Provider>
  );
};
export default NewsListProvider;

export const useNewsListStore = () => {
  return useContext(NewsListContext);
};
