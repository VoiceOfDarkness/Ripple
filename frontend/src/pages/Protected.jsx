import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../store/profile-slice";
import Cookies from "js-cookie";

export default function ProtectedRoot() {
  const isTokenExist = Cookies.get("access_token") !== undefined;

  return (
    <>{isTokenExist ? <Outlet /> : <Navigate to={"/auth?mode=login"} />}</>
  );
}
