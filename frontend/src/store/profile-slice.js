import { createSlice } from "@reduxjs/toolkit";
import api from "../helpers/request";
import { uiMessage } from "../helpers/uiMessage";

export const getProfile = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("user/profile");

      dispatch(
        profileActions.setProfile({
          profile: response.data,
        })
      );
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload.profile;
    },
  },
});

export const profileActions = profileSlice.actions;
