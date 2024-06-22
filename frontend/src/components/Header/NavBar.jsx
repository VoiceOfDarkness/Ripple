import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "../../store/profile-slice";
import api from "../../helpers/request";
import { changeRole } from "../../store/auth-actions";

export default function MenuNavBar() {
  const isTokenExist = Cookies.get("access_token") !== undefined;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  const [isFreelancer, setIsFreelancer] = useState();

  useEffect(() => {
    if (isTokenExist) {
      dispatch(getProfile());
    }
    setIsFreelancer(user.profile?.is_freelancer);
  }, [dispatch, isFreelancer, user.profile?.is_freelancer]);

  return (
    <div className="bg-transparent w-full z-10 top-0 pt-16 px-14 flex text-white items-center justify-between">
      <h1 className="text-6xl font-black">Ripple</h1>
      <div className="max-md:hidden">
        <ul className="flex gap-14 items-center font-semibold text-3xl">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
          {isTokenExist ? (
            <>
              <li
                className="text-purple hover:text-white font-semibold duration-300"
                onClick={() => {
                  dispatch(
                    changeRole(
                      isFreelancer
                        ? "switch_to_hire_manager"
                        : "switch_to_freelancer"
                    )
                  );
                  setIsFreelancer(!isFreelancer);
                }}
              >
                <button>
                  {isFreelancer ? "Become a buyer" : "Become a seller"}
                </button>
              </li>
              <li className="flex gap-4 items-center">
                {user.profile?.user_image ? (
                  <img
                    src={`${
                      user.profile?.user_image.includes("http")
                        ? ""
                        : "http://localhost:8000/app/media/"
                    }${user.profile?.user_image}`}
                    className=" w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full flex justify-center items-center bg-purple">
                    {user.profile?.user_name[0].toUpperCase()}
                  </div>
                )}

                <Link to="/profile">{user.profile?.user_name}</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="auth?mode=login"
                  className="border border-white hover:bg-white hover:text-black rounded-lg border-solid p-4 px-10 transition-all duration-500"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="auth?mode=signup"
                  className="rounded-lg p-4 px-10 hover:bg-cardBlack hover:text-white border-white border bg-white text-black transition-all duration-500"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="hidden max-md:block">
        <Menu style={{ width: "6rem", height: "6rem" }} />
      </div>
    </div>
  );
}
