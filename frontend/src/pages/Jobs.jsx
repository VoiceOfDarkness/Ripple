import SideNav from "../components/SideNav/SideNav";
import { useState } from "react";
import { useEffect } from "react";

import { motion as m } from "framer-motion";

export default function JobsPage() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to check the screen width and update the state
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Initial check when component mounts
    checkScreenSize();

    // Add event listener to update state on window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [setIsVisible]);

  return (
    <>
      <div className="bg-backGrey w-full absolute h-full">
        <SideNav isVisible={isVisible} setIsVisible={setIsVisible} />
        <m.div
          animate={isVisible ? { marginLeft: "20%" } : { marginLeft: "5%" }}
          transition={{ duration: 0.8 }}
        ></m.div>
      </div>
    </>
  );
}
