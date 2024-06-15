import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "catacory",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategory(state, action) {
      state.categories = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
