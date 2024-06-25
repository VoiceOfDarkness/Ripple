import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./category-slice";
import { authSlice } from "./auth-slice";
import { gigSlice } from "./gig-slice";
import { uiMessageSlice } from "./uiMessage";
import { profileSlice } from "./profile-slice";
import { orderSlice } from "./order-slice";
import { reviewSlice } from "./review-slice";
import { chatSlice } from "./chat-slice";

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    auth: authSlice.reducer,
    gigs: gigSlice.reducer,
    uiMessage: uiMessageSlice.reducer,
    profile: profileSlice.reducer,
    order: orderSlice.reducer,
    reviews: reviewSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
