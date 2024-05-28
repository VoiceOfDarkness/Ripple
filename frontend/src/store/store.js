import { configureStore } from "@reduxjs/toolkit";
import { catacorySlice } from "./catacory-slice";
import { authSlice } from "./auth-slice";

const store = configureStore({
  reducer: {
    category: catacorySlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
