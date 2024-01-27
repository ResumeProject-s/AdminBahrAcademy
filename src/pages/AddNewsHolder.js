import React from "react";

import { AddNews } from "../../views/apps/news/add/AddNews";
import AddNewsProvider from "./../utility/context/News/AddNews";

const AddNewsHolder = () => {
  return (
    <div>
      <AddNewsProvider>
        <AddNews />
      </AddNewsProvider>
    </div>
  );
};

export { AddNewsHolder };
