import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    message: null,
    verify: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.loading = action.payload.loading;
      state.message = action.payload.message;
      state.verify = action.payload.verify;
    },
  },
});

export const authActions = authSlice.actions;
