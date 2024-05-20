import AnnouncementsIcon from "../Icons/AnnouncementsIcon";
import MyWorkIcon from "../Icons/MyWorkIcon";
import StatisticIcon from "../Icons/StatisticIcon";
import ChatIcon from "../Icons/ChatIcon";
import MyProfileIcon from "../Icons/MyProfileIcon";
import PaymentIcon from "../Icons/PaymentIcon";
import { Settings } from "@mui/icons-material";
import HelpIcon from "../Icons/HelpIcon";
import LogOutIcon from "../Icons/LogOutIcon";
import StarShape from "../../layouts/StarShape";

import { motion as m } from "framer-motion";

export default function SideNav({ isVisible, setIsVisible }) {
  const click = () => {
    setIsVisible((prevState) => !prevState);
  };

  const menu = [
    ["Announcment", <AnnouncementsIcon />],
    ["My Work", <MyWorkIcon />],
    ["Statistics", <StatisticIcon />],
    ["Chat", <ChatIcon />],
    ["My profile", <MyProfileIcon />],
    ["Payment Info", <PaymentIcon />],
    ["Settings", <Settings style={{ fontSize: "2.5rem" }} />],
  ];
  return (
    <m.div
      className="fixed h-screen bg-black z-50 pr-24 rounded-r-3xl"
      animate={isVisible ? { translate: 0 } : { translate: "-85%" }}
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
          <h1 className="font-bold">Ripple</h1>
        </div>

        <div>
          <ul className="flex flex-col gap-14">
            {menu.map((item, index) => {
              return (
                <li
                  className="flex gap-5 hover:text-purple duration-200"
                  key={index}
                >
                  {item[1]}
                  <a href="/">{item[0]}</a>
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
            <li className="text-red flex gap-5">
              <LogOutIcon />
              <a href="/">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </m.div>
  );
}
