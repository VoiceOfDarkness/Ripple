import api from "@/helpers/request";
import { uiMessage } from "@/helpers/uiMessage";
import { createSlice } from "@reduxjs/toolkit";

export const createReview = (id, comment, rating) => {
  return async (dispatch) => {
    try {
      await api.post("review", {
        gig_id: id,
        rating: rating,
        comment: comment,
      });
      dispatch(reviewActions.setStatus());
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};

export const deleteReview = (id) => {
  return async (dispatch) => {
    try {
      await api.delete(`review/${id}`);
      dispatch(reviewActions.setStatus());
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};

// export const getReview = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await api.get(`/gig/${id}`);

//       dispatch(reviewActions.setReview(response.data.reviews));
//     } catch (error) {
//       dispatch(
//         uiMessage(error.message, error.response?.data?.details, "error")
//       );
//     }
//   };
// };

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    status: true,
  },
  reducers: {
    setStatus(state) {
      state.status = !state.status;
    },
  },
});

export const reviewActions = reviewSlice.actions;
