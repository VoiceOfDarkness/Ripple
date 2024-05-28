import axios from "axios";
import { catacoryActions } from "./catacory-slice";

export const getCatacories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://3a5e-94-20-49-98.ngrok-free.app/api/v1/categories"
      );
      dispatch(catacoryActions.setCatacory(response.data));
    } catch (error) {}
  };
};
