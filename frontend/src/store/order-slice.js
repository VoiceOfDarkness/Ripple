import { createSlice } from "@reduxjs/toolkit";
import api from "../helpers/request";
import { uiMessage } from "../helpers/uiMessage";

export const createOrder = (
  seller_id,
  gig_id,
  status = "pending",
  total_price
) => {
  return async (dispatch) => {
    try {
      const response = await api.post("order", {
        seller_id,
        gig_id,
        status,
        total_price,
      });
      dispatch(uiMessage("Order added sucessfully", undefined, "success"));
    } catch (error) {
      const message =
        error.response?.status === 401
          ? "You can not order because you are a freelancer"
          : error.message;
      dispatch(uiMessage(message, error.response?.data?.detail, "error"));
    }
  };
};

export const getOrder = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("orders");
      dispatch(orderActions.setGig(response.data));
    } catch (error) {}
  };
};

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },

  reducers: {
    setGig(state, action) {
      state.orders = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;
