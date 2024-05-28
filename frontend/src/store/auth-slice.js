import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    message: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.loading = action.payload.loading;
      state.message = action.payload.message;
    },
  },
});

export const authActions = authSlice.actions;
