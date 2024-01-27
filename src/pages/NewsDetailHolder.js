import React from "react";
import NewsDetail from "../../views/apps/news/detail/newsDetail";
import NewsDetailProvider from "../utility/context/News/NewsDetail";

const NewsDetailHolder = () => {
  return (
    <div>
      <NewsDetailProvider>
        <NewsDetail />
      </NewsDetailProvider>
    </div>
  );
};

export default NewsDetailHolder;
