import axios from "axios";
import { authActions } from "./auth-slice";
import Cookies from "js-cookie";
import { uiMessage } from "../helpers/uiMessage";
import api from "../helpers/request";

export const login = (email, password, navigate, redirectTo) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/sign-in",
        {
          email: email,
          password: password,
        }
      );

      Cookies.set("access_token", res.data.access_token, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      dispatch(authActions.clearErrorMessage());
      navigate(redirectTo);
    } catch (error) {
      dispatch(
        authActions.setUser({
          errorMessage: error.response?.data?.detail,
        })
      );
    }
  };
};

export const createUser = (userName, password, email, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/sign-up",
        {
          username: userName,
          email: email,
          password: password,
        }
      );

      // dispatch(
      //   authActions.setUser({
      //     user: res.data,
      //   })
      // );
      dispatch(authActions.clearErrorMessage());
      navigate("?mode=verify");
    } catch (error) {
      dispatch(
        authActions.setUser({
          errorMessage: error.response?.data?.detail,
        })
      );
    }
  };
};

export const verifyUser = (code) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/sign-up/verify-code",
        code
      );

      dispatch(
        authActions.setUser({
          verify: res.status,
        })
      );
      dispatch(authActions.clearErrorMessage());
    } catch (error) {
      dispatch(uiMessage(error.message, error.response?.data?.detail, "error"));
    }
  };
};

// export const loginGoogle = () => {
//   return async (dispatch) => {
//     dispatch(
//       authActions.setUser({
//         token: {
//           token: url.get("access_token"),
//           expiration: url.get("expiration"),
//         },
//       })
//     );
//   };
// };

export const changePassword = (password, newPassword) => {
  return async (dispatch) => {
    try {
      const response = await api.post("auth/settings/change-password", {
        old_password: password,
        new_password: newPassword,
      });

      dispatch(uiMessage("Password changed successfully", "", "success"));
    } catch (error) {
      dispatch(uiMessage(error.message, error.response?.data?.detail, "error"));
    }
  };
};

export const changeRole = (url) => {
  return async (dispatch) => {
    try {
      await api.patch(`user/${url}`);
      // dispatch(uiMessage("Successfully change"), "", "success");
    } catch (error) {
      dispatch(uiMessage(error.message, error.response?.data?.detail, "error"));
    }
  };
};
