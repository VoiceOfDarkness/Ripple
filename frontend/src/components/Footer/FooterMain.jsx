import React from "react";
import SocialIcons from "../SocialIcons";

const FooterMain = ({ className }) => {
  return (
    <footer
      className={`footer px-10 py-4 border-t bg-base-200 text-base-content dark:text-white border-base-300 ${className}`}>
      <nav className="w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <h3 className="text-3xl md:text-6xl font-black">Ripple</h3>
            <p className="text-lg md:text-xl content-center">
              © 2023 Ripple. All rights reserved
            </p>
          </div>
          <div className="flex justify-center md:justify-end gap-5 mt-5 md:mt-0">
            <SocialIcons />
          </div>
          <div className="flex flex-col md:flex-row gap-5 justify-center md:justify-end items-center mt-5 md:mt-0">
            <button>
              <span className="text-lg md:text-xl font-black">English</span>
            </button>
            <button className="text-lg md:text-xl font-black">Currency</button>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default FooterMain;
