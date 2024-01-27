import { createContext, useContext, useState } from "react";

const CommentsAdminContext = createContext();

const CommentsProvider = ({ children }) => {
  const [allComments, setAllComments] = useState();
  const [CommentsTotalCount, setCommentsTotalCount] = useState();

  const [rowOfPage, setRowOfPage] = useState(10);
  const [sortType, setSortType] = useState("");
  const [SearchDatas, setSearchDatas] = useState("");

  return (
    <CommentsAdminContext.Provider
      value={{
        allComments,
        setAllComments,
        CommentsTotalCount,
        setCommentsTotalCount,
        rowOfPage,
        setRowOfPage,
        sortType,
        setSortType,
        SearchDatas,
        setSearchDatas,
      }}
    >
      {children}
    </CommentsAdminContext.Provider>
  );
};

export default CommentsProvider;
export const useCommentsAdminStore = () => useContext(CommentsAdminContext);
