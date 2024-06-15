import { Menu } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import JobSetting from "../Icons/JobsSetting";
import { JobsComment } from "../Icons/JobsComment";
import JobsAlert from "../Icons/JobsAlert";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "../../store/profile-slice";
import { Link } from "react-router-dom";

export default function JobHeader() {
  const [isTokenExist, setIsTokenExist] = useState(
    Cookies.get("access_token") !== undefined
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const tokenExists = Cookies.get("access_token") !== undefined;
      if (tokenExists !== isTokenExist) {
        setIsTokenExist(tokenExists);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTokenExist]);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile);

  useEffect(() => {
    if (isTokenExist) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <div className="bg-transparent  z-10 top-0 pt-12  flex text-white items-center ">
      <div className="max-md:hidden w-full">
        <ul className="flex items-center gap-20 text-3xl">
          <li className="w-1/3">
            <div className="flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-full placeholder-white px-6 py-3 outline-none bg-inputGray text-white transition-all duration-500  pr-12"
                />
                <SearchIcon
                  fontSize="large"
                  className="absolute large right-4 top-1/2 transform -translate-y-1/2 text-white"
                />
              </div>
            </div>
          </li>
          <li>
            <a href="/">Location...</a>
          </li>
          <div className="flex items-center justify-center pl-64 gap-5">
            <li>
              <a href="/">
                <div className="w-16 h-16 flex items-center justify-center bg-inputGray rounded-full">
                  <JobSetting />
                </div>
              </a>
            </li>
            <li>
              <label className="inline-flex cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </li>
          </div>
          <div className="flex items-center justify-center gap-5">
            <li>
              <a href="/">
                <JobsComment />
              </a>
            </li>
            <li>
              <a href="/">
                <JobsAlert />
              </a>
            </li>
          </div>
          {isTokenExist && (
            <div className="flex gap-5">
              <div className="flex items-center">
                <div className="flex gap-4 items-center">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
      <div className="hidden max-md:block">
        <Menu style={{ width: "6rem", height: "6rem" }} />
      </div>
    </div>
  );
}
