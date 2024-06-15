import { createSlice } from "@reduxjs/toolkit";

export const uiMessageSlice = createSlice({
  name: "uiMessage",
  initialState: {
    message: null,
    description: null,
    type: null,
  },

  reducers: {
    setMessage(state, action) {
      state.message = action.payload.message;
      state.description = action.payload.description;
      state.type = action.payload.type;
    },
  },
});

export const uiMessageActions = uiMessageSlice.actions;
