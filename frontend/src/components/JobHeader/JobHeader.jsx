import { Menu } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import JobSetting from "../Icons/JobsSetting";
import { JobsComment } from "../Icons/JobsComment";
import JobsAlert from "../Icons/JobsAlert";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../../store/profile-slice";
import { Link, useNavigate } from "react-router-dom";
import api from "../../helpers/request";
import { changeRole } from "../../store/auth-actions";
import { searchGig } from "@/store/gig-actions";
import { MEDIA } from "@/helpers/config";

export default function JobHeader() {
  const [isTokenExist, setIsTokenExist] = useState(
    Cookies.get("access_token") !== undefined
  );

  const [isFreelancer, setIsFreelancer] = useState();
  const searchQuery = useRef();
  const navigate = useNavigate();

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
    setIsFreelancer(user.profile?.is_freelancer);
  }, [dispatch, user.profile?.is_freelancer]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${searchQuery.current.value}`);
    searchQuery.current.value = "";
  };

  return (
    <div className="bg-transparent  z-10 top-0 pt-12  flex text-white items-center ">
      <div className="w-full">
        <ul className="flex justify-between mr-24 items-center gap-20 text-3xl">
          <li className="w-1/3">
            <div className="flex items-center">
              <div className="relative w-full">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search..."
                    ref={searchQuery}
                    className="w-full rounded-full placeholder-white px-6 py-3 outline-none bg-inputGray text-white transition-all duration-500  pr-12"
                  />
                  <SearchIcon
                    fontSize="large"
                    className="absolute large right-4 top-1/2 transform -translate-y-1/2 text-white"
                  />
                </form>
              </div>
            </div>
          </li>
          <div className="flex items-center justify-center pl-64 gap-5">
            <li>
              <Link to="/settings">
                <div className="w-16 h-16 flex items-center justify-center bg-inputGray rounded-full">
                  <JobSetting />
                </div>
              </Link>
            </li>
          </div>
          {/* <div className="flex items-center justify-center gap-5">
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
          </div> */}
          {isTokenExist && (
            <div className="flex gap-5">
              <div className="flex items-center gap-8 font-semibold">
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
                <div className="flex gap-4 items-center">
                  {user.profile?.user_image ? (
                    <img
                      src={`${
                        user.profile?.user_image.includes("http") ? "" : MEDIA
                      }${user.profile?.user_image}`}
                      className=" w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full flex justify-center items-center bg-purple">
                      {user.profile?.user_name[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Link to="/profile">{user.profile?.user_name}</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
