import api from "../helpers/request";
import { uiMessage } from "../helpers/uiMessage";
import { categoryActions } from "./category-slice";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("categories");
      dispatch(categoryActions.setCategory(response.data));
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};
