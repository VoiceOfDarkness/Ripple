import { Menu, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "../../store/profile-slice";
import { changeRole } from "../../store/auth-actions";

export default function MenuNavBar() {
  const isTokenExist = Cookies.get("access_token") !== undefined;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  const [isFreelancer, setIsFreelancer] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isTokenExist) {
      dispatch(getProfile());
    }
    setIsFreelancer(user.profile?.is_freelancer);
  }, [dispatch, isFreelancer, user.profile?.is_freelancer]);

  return (
    <div className="relative bg-transparent w-full z-10 top-0 pt-16 px-14 flex text-white items-center justify-between">
      <h1 className="text-6xl font-black">Ripple</h1>
      <div className="max-md:hidden">
        <ul className="flex gap-14 items-center font-semibold text-3xl">
          <li>
            <Link to="/" className="cursor-pointer">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="cursor-pointer">
              About
            </Link>
          </li>
          <li>
            <Link to="jobs" className="cursor-pointer">
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/" className="cursor-pointer">
              Contact
            </Link>
          </li>
          {isTokenExist ? (
            <>
              <li
                className="text-purple hover:text-white font-semibold duration-300 cursor-pointer"
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
              <li className="flex gap-4 items-center cursor-pointer">
                {user.profile?.user_image ? (
                  <img
                    src={`${
                      user.profile?.user_image.includes("http")
                        ? ""
                        : "http://backend:8000/app/media/"
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
                  className="border border-white hover:bg-white hover:text-black rounded-lg border-solid p-4 px-10 transition-all duration-500 cursor-pointer"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="auth?mode=signup"
                  className="rounded-lg p-4 px-10 hover:bg-cardBlack hover:text-white border-white border bg-white text-black transition-all duration-500 cursor-pointer"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="hidden max-md:block z-30">
        <Menu
          style={{ width: "6rem", height: "6rem" }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer"
        />
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-lg z-40 flex flex-col items-center justify-center">
          <Close
            style={{ width: "6rem", height: "6rem" }}
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 cursor-pointer"
          />
          <ul className="flex flex-col gap-8 items-center font-semibold text-3xl text-white z-50">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="jobs"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                Contact
              </Link>
            </li>
            {isTokenExist ? (
              <>
                <li
                  className="text-purple hover:text-white font-semibold duration-300 cursor-pointer"
                  onClick={() => {
                    dispatch(
                      changeRole(
                        isFreelancer
                          ? "switch_to_hire_manager"
                          : "switch_to_freelancer"
                      )
                    );
                    setIsFreelancer(!user.profile.is_freelancer);
                    setMenuOpen(false);
                  }}
                >
                  <button>
                    {isFreelancer ? "Become a buyer" : "Become a seller"}
                  </button>
                </li>
                <li className="flex gap-4 items-center cursor-pointer">
                  {user.profile?.user_image ? (
                    <img
                      src={`${
                        user.profile?.user_image.includes("http")
                          ? ""
                          : "http://backend:8000/app/media/"
                      }${user.profile?.user_image}`}
                      className=" w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full flex justify-center items-center bg-purple">
                      {user.profile?.user_name[0].toUpperCase()}
                    </div>
                  )}

                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    {user.profile?.user_name}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="mt-10">
                  <Link
                    to="auth?mode=login"
                    className="border border-white hover:bg-white hover:text-black rounded-lg border-solid p-4 px-10 transition-all duration-500 cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li className="mt-10">
                  <Link
                    to="auth?mode=signup"
                    className="rounded-lg p-4 px-10 hover:bg-cardBlack hover:text-white border-white border bg-white text-black transition-all duration-500 cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
