import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsInformation: [],
  },
  reducers: {
    onSetNewsList: (state, action) => {
      newsInformation.state = { ...newsInformation.state, ...action.payload };
    },
  },
});

export const { onSetNewsList } = newsSlice.actions;

export default newsSlice.reducer;
