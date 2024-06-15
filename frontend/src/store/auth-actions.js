import axios from "axios";
import { authActions } from "./auth-slice";
import Cookies from "js-cookie";
import { uiMessageActions } from "./uiMessage";
import { uiMessage } from "../helpers/uiMessage";

export const login = (email, password) => {
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
    } catch (error) {
      dispatch(
        authActions.setUser({
          errorMessage: error.response?.data?.detail,
        })
      );
    }
  };
};

export const craeteUser = (userName, password, email) => {
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

      dispatch(
        authActions.setUser({
          user: res.data,
        })
      );
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
    } catch (error) {
      dispatch(
        uiMessage(error.message, error.response?.data?.details, "error")
      );
    }
  };
};

export const loginGoogle = () => {
  return async (dispatch) => {
    const url = new URLSearchParams(window.location.search);

    console.log(url.get("access_token"), url.get("expiration"));
    dispatch(
      authActions.setUser({
        token: {
          token: url.get("access_token"),
          expiration: url.get("expiration"),
        },
      })
    );
  };
};
