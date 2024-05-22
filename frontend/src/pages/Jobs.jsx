import SideNav from "../components/SideNav/SideNav";
import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import JobMain from "../components/JobMain/index";
import Footer from "../components/Footer/Footer";
import FooterMain from "../components/Footer/FooterMain";

export default function JobsPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [marginLeftPercentage, setMarginLeftPercentage] = useState(22);

  useEffect(() => {
    // Function to check the screen width and update the state
    const checkScreenSize = () => {
      const windowWidth = window.innerWidth;
      const newMarginLeftPercentage = windowWidth <= 1200 ? 30 : 22;
      const newMarginLeftPercentage1 = windowWidth <= 768 ? 40 : 30;
      setMarginLeftPercentage(newMarginLeftPercentage1);
      setMarginLeftPercentage(newMarginLeftPercentage);
      setIsVisible(windowWidth > 768);
    };

    // Initial check when component mounts
    checkScreenSize();

    // Add event listener to update state on window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      <div className="bg-backGrey w-full absolute ">
        <SideNav isVisible={isVisible} setIsVisible={setIsVisible} />
        <m.div
          animate={{ marginLeft: isVisible ? `${marginLeftPercentage}%` : '5%' }}
          transition={{ duration: 0.8 }}
        >
          <JobMain />
          <FooterMain/>
        </m.div>
      </div>
    </>
  );
}
