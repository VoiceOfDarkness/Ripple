import AnnouncementsIcon from "../Icons/AnnouncementsIcon";
import MyWorkIcon from "../Icons/MyWorkIcon";
import { ShoppingCart } from "lucide-react";
import { Checklist } from "@mui/icons-material";
import ChatIcon from "../Icons/ChatIcon";
import MyProfileIcon from "../Icons/MyProfileIcon";
import PaymentIcon from "../Icons/PaymentIcon";
import HelpIcon from "../Icons/HelpIcon";
import LogOutIcon from "../Icons/LogOutIcon";
import StarShape from "../ui/StarShape";
import Cookies from "js-cookie";

import { motion as m } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function SideNav({ isVisible, setIsVisible }) {
  const isTokenExist = Cookies.get("access_token") !== undefined;
  const navigation = useNavigate();
  const click = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigation("/");
  };

  const menu = [
    ["Jobs", <AnnouncementsIcon />, "/jobs"],
    isTokenExist && ["My Work", <MyWorkIcon />, "/mywork"],
    ["Orders", <Checklist style={{fontSize: "2.5rem"}}/>, "/orders"],
    ["Chat", <ChatIcon />, "/chat"],
    ["My profile", <MyProfileIcon />, "/profile"],
    ["Payment Info", <PaymentIcon />, "/payment"],
  ].filter(Boolean);

  return (
    <m.div
      className="fixed h-full bg-black z-50 pr-24 rounded-r-3xl"
      initial={{ translate: 0 }}
      animate={isVisible ? { translate: 0 } : { translate: "-98.4%" }}
      transition={{ duration: 0.8 }}
    >
      <StarShape className="flex justify-end text-black absolute -right-12 top-1/2 -translate-y-1/2 -z-50">
        <div
          className="p-2 border-white absolute top-1/2 right-4 -translate-y-1/2 flex rounded-full border w-10 h-10 items-center justify-center cursor-pointer"
          onClick={click}
        >
          <m.span
            className="text-white"
            animate={isVisible ? { rotate: 0 } : { rotate: 180 }}
            transition={{ duration: 0.8 }}
          >
            &lt;
          </m.span>
        </div>
      </StarShape>

      <div className="p-12 flex flex-col h-full justify-between">
        <div className="text-6xl">
          <Link to="/">
            <h1 className="font-bold">Ripple</h1>
          </Link>
        </div>

        <div>
          <ul className="flex flex-col gap-14">
            {menu.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={item[2]}
                    className={({ isActive }) =>
                      [
                        isActive && "text-purple",
                        "flex gap-5 hover:text-purple duration-200",
                      ].join(" ")
                    }
                  >
                    {item[1]}
                    {item[0]}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <ul className="flex flex-col gap-8">
            <li className="flex gap-5">
              <HelpIcon />
              <a href="/">Help Center</a>
            </li>
            {isTokenExist ? (
              <li className="text-red flex gap-5">
                <LogOutIcon />
                <button onClick={handleLogout}>Log Out</button>
              </li>
            ) : (
              <Link
                to="/auth?mode=login"
                className="border border-white hover:bg-white text-center hover:text-black rounded-lg border-solid p-4 px-10 transition-all duration-500"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </m.div>
  );
}
