import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./category-slice";
import { authSlice } from "./auth-slice";
import { gigSlice } from "./gig-slice";
import { uiMessageSlice } from "./uiMessage";
import { profileSlice } from "./profile-slice";

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    auth: authSlice.reducer,
    gigs: gigSlice.reducer,
    uiMessage: uiMessageSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
