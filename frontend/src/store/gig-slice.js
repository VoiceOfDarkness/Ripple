import { createSlice } from "@reduxjs/toolkit";

export const gigSlice = createSlice({
  name: "gig",
  initialState: {
    gigs: [],
    gig: null,
    searchedGigs: [],
  },
  reducers: {
    setGig(state, action) {
      state.gigs = action.payload.gigs;
      state.gig = action.payload.gig;
    },
    setSearchedGig(state, action) {
      state.searchedGigs = action.payload;
    },
  },
});

export const gigActions = gigSlice.actions;
