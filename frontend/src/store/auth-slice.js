import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    errorMessage: null,
    verify: null,
  },
  reducers: {
    setUser(state, action) {
      state.errorMessage = action.payload.errorMessage || null;
      state.verify = action.payload.verify || null;
    },
  },
});

export const authActions = authSlice.actions;
