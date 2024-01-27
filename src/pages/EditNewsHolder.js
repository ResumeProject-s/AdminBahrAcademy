import React from "react";
import NewsDetailProvider from "./../utility/context/News/NewsDetail";
import EditNews from "../../views/apps/news/edit/EditNews";

const EditNewsHolder = () => {
  return (
    <div>
      <NewsDetailProvider>
        <EditNews />
      </NewsDetailProvider>
    </div>
  );
};

export { EditNewsHolder };
