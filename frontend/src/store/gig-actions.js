import api from "../helpers/request";
import { gigActions } from "./gig-slice";
import axios from "axios";
import { uiMessage } from "../helpers/uiMessage";
import { API } from "@/helpers/config";

export const getGigs = (currentPage) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API}gigs?page=${currentPage || 1}&size=10`
      );

      dispatch(
        gigActions.setGig({
          gigs: response.data,
        })
      );
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};

export const getGigById = (id) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`gig/${id}`);

      dispatch(
        gigActions.setGig({
          gig: response.data,
        })
      );
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};

export const deleteGig = (id) => {
  return async (dispatch) => {
    try {
      const response = await api.delete(`gig/${id}`);

      dispatch(uiMessage("Deleted successfully", undefined, "success"));
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};

export const searchGig = (query) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`gig/search?query=${query}`);

      dispatch(gigActions.setSearchedGig(response.data));
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};
