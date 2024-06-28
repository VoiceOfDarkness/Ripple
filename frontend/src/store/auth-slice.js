import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    errorMessage: null,
    verify: null,
    status: null,
  },
  reducers: {
    setUser(state, action) {
      state.errorMessage = action.payload.errorMessage;
      state.status = action.payload.status;
      state.verify = action.payload.verify;
    },
    clearErrorMessage(state) {
      state.errorMessage = null;
    },
  },
});

export const authActions = authSlice.actions;
