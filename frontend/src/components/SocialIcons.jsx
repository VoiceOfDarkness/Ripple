import { Instagram, Twitter, Facebook, LinkedIn } from "@mui/icons-material";
import React from "react";

const SocialIcons = () => {
  const icons = [
    <Instagram className="m-1 text-grey icon" />,
    <Twitter className="m-1 text-grey icon" />,
    <Facebook className="m-1 text-grey icon" />,
    <LinkedIn className="m-1 text-grey icon" />,
  ];

  return (
    <ul className="flex gap-5 ">
      {icons.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default SocialIcons;
