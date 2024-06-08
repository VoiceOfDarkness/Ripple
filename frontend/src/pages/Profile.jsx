import React from "react";
import GradientAnimation from "../components/MorphingGradient/GradientAnimation";
import UserContainer from "../components/UserContainer";
import DetailHeaders from "../components/DetailHeaders";
import ProfileInfoes from "../components/ProfileInfoes";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Profile = () => {
  return (
    <div className="rounded-3xl mt-10 mr-24 p-5 bg-black relative">
      <GradientAnimation />
      <UserContainer>
        <DetailHeaders />
        <div className="border-l border-slate-300 mr-24 relative flex flex-col items-center">
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-28 -ml-[0.69rem]"
          />
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-14 -ml-[0.69rem]"
          />
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-60 -ml-[0.69rem]"
          />
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-64 -ml-[0.69rem]"
          />
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-10 -ml-[0.69rem]"
          />
        </div>
        <ProfileInfoes />
      </UserContainer>
    </div>
  );
};

export default Profile;
