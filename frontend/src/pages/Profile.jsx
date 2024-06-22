import React from "react";
import GradientAnimation from "../components/MorphingGradient/GradientAnimation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../store/profile-slice";

import { ProfileSection } from "@/components/Profile/ProfileSection";
import { ProfileGigsSection } from "@/components/Profile/ProfileGigSection";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [
    dispatch,
    user.profile?.user_name,
    user.profile?.user_image,
    user.profile?.first_name,
    user.profile?.last_name,
    user.profile?.is_freelancer,
  ]);

  return (
    <div className="p-8 mt-10 bg-black relative mr-24 rounded-3xl">
      <GradientAnimation />
      <div className="mt-10 gap-10 justify-between flex" data-id="element-44">
        <ProfileSection data-id="element-45" user={user} />

        {user.profile?.is_freelancer && (
          <ProfileGigsSection data-id="element-46" user={user} />
        )}
      </div>
    </div>
  );
};

export default Profile;
