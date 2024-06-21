import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./category-slice";
import { authSlice } from "./auth-slice";
import { gigSlice } from "./gig-slice";
import { uiMessageSlice } from "./uiMessage";
import { profileSlice } from "./profile-slice";
import { orderSlice } from "./order-slice";

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    auth: authSlice.reducer,
    gigs: gigSlice.reducer,
    uiMessage: uiMessageSlice.reducer,
    profile: profileSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;
