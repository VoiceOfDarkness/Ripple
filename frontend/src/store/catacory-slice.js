import { createSlice } from "@reduxjs/toolkit";

export const catacorySlice = createSlice({
  name: "catacory",
  initialState: {
    catacories: [],
  },
  reducers: {
    setCatacory(state, action) {
        state.catacories = action.payload;
    }
  }
});

export const catacoryActions = catacorySlice.actions;