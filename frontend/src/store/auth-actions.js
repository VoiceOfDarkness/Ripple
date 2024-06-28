import axios from "axios";
import { authActions } from "./auth-slice";
import Cookies from "js-cookie";
import { uiMessage } from "../helpers/uiMessage";
import api from "../helpers/request";
import { profileActions } from "./profile-slice";
import { API } from "@/helpers/config";

export const login = (email, password, navigate, redirectTo) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${API}auth/sign-in`,
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
          status: error.response?.status,
        })
      );
    }
  };
};

export const createUser = (userName, password, email, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${API}auth/sign-up`,
        {
          username: userName,
          email: email,
          password: password,
        }
      );
      dispatch(authActions.clearErrorMessage());
      Cookies.set("temp_email", email, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      navigate("?mode=verify");
    } catch (error) {
      dispatch(
        authActions.setUser({
          errorMessage: error.response?.data?.detail,
        })
      );
      if (error.code === "ERR_NETWORK") {
        dispatch(uiMessage(error.message, undefined, "error"));
      }
    }
  };
};

export const verifyUser = (code) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${API}auth/sign-up/verify-code`,
        code
      );

      dispatch(
        authActions.setUser({
          verify: res.status,
        })
      );
      Cookies.remove("temp_email");
      dispatch(authActions.clearErrorMessage());
    } catch (error) {
      dispatch(
        uiMessage(
          "There is a problem when try verify",
          error.response?.data?.detail,
          "error"
        )
      );
    }
  };
};

export const resendCode = () => {
  return async (dispatch) => {
    try {
      const email = Cookies.get("temp_email");
      const res = await axios.post(
        `${API}auth/sign-up/resend-code`,
        email
      );
      dispatch(authActions.clearErrorMessage());
    } catch (error) {
      dispatch(
        uiMessage(
          "Something went wrong when try resend code",
          error.response?.data?.detail,
          "error"
        )
      );
    }
  };
};

export const changePassword = (password, newPassword) => {
  return async (dispatch) => {
    try {
      const response = await api.patch("auth/settings/change-password", {
        old_password: password,
        new_password: newPassword,
      });

      dispatch(uiMessage("Password changed successfully", "", "success"));
    } catch (error) {
      dispatch(
        uiMessage(
          "Can not change password",
          error.response?.data?.detail,
          "error"
        )
      );
    }
  };
};

export const changeRole = (url) => {
  return async (dispatch) => {
    try {
      const response = await api.patch(`user/${url}`);
      dispatch(
        profileActions.changeRole(
          response.data?.message?.includes("hire") ? false : true
        )
      );
      // dispatch(uiMessage("Successfully change"), "", "success");
    } catch (error) {
      dispatch(
        uiMessage("Can not change role", error.response?.data?.detail, "error")
      );
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
