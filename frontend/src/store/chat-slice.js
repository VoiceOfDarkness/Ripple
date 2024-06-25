import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    reciver: null,
  },

  reducers: {
    setReciver(state, action) {
      state.reciver = action.payload;
    },
    clearReciver(state) {
      state.reciver = null;
    },
  },
});

export const chatActions = chatSlice.actions;
