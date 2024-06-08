import axios from "axios";
import { authActions } from "./auth-slice";
import Cookies from "js-cookie";

export const login = (email, password) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8000/api/v1/auth/sign-in", {
      email: email,
      password: password,
    });

    dispatch(
      authActions.setUser({
        user: res.data,
        loading: true,
        message: "Successfull",
      })
    );

    Cookies.set("access-token", res.data.access_token, {
      expires: 7,
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  };
};

export const craeteUser = (userName, password, email) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8000/api/v1/auth/sign-up", {
      username: userName,
      email: email,
      password: password,
    });

    dispatch(
      authActions.setUser({
        user: res.data,
      })
    );
  };
};

export const verifyUser = (code) => {
  return async (dispatch) => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/sign-up/verify-code",
      code
    );

    dispatch(
      authActions.setUser({
        verify: res.status,
      })
    );
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
