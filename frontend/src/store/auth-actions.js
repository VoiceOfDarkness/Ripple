import axios from "axios";
import { authActions } from "./auth-slice";

export const login = (email, password) => {
  return async (dispatch) => {
    const res = await axios.post("https://localhost:7013/api/users/login", {
      userNameOrEmail: email,
      password,
    });

    dispatch(
      authActions.setUser({
        user: res.data?.token,
        loading: true,
        message: "Successfull",
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
