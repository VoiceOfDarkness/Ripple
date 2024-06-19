import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    errorMessage: null,
    verify: null,
  },
  reducers: {
    setUser(state, action) {
      state.errorMessage = action.payload.errorMessage;
      state.verify = action.payload.verify;
    },
    clearErrorMessage(state) {
      state.errorMessage = null;
    },
  },
});

export const authActions = authSlice.actions;
