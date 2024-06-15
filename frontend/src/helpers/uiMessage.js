import { uiMessageActions } from "../store/uiMessage";

export const uiMessage = (message, description, type) => {
  return (dispatch) => {
    dispatch(
      uiMessageActions.setMessage({
        message: "",
      })
    );
    dispatch(
      uiMessageActions.setMessage({
        message,
        type,
        description,
      })
    );
  };
};
