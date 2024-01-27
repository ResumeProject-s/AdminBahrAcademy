import { createContext, useContext, useState } from "react";
const NewsDetailContext = createContext();
const NewsDetailProvider = ({ children }) => {
  const [newsDetails, setNewsDetails] = useState();
  const [newsComments, setNewsComments] = useState();
  const [reserved, setReserved] = useState([]);

  return (
    <NewsDetailContext.Provider
      value={{
        newsDetails,
        setNewsDetails,
        newsComments,
        setNewsComments,
        reserved,
        setReserved,
      }}
    >
      {children}
    </NewsDetailContext.Provider>
  );
};
export default NewsDetailProvider;

export const useNewsDetailStore = () => {
  return useContext(NewsDetailContext);
};
