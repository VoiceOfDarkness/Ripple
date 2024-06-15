import { createSlice } from "@reduxjs/toolkit";

export const gigSlice = createSlice({
  name: "gig",
  initialState: {
    gigs: [],
    gig: null,
  },
  reducers: {
    setGig(state, action) {
      state.gigs = action.payload.gigs;
      state.gig = action.payload.gig;
    },
  },
});

export const gigActions = gigSlice.actions;
