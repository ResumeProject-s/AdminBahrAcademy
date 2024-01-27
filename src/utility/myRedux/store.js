import { configureStore } from "@reduxjs/toolkit";
import news from "./news";

const store = configureStore({
  reducer: {
    news,
  },
});

export default store;
