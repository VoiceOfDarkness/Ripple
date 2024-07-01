import { getProfile } from "@/store/profile-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserDetails() {
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="flex mt-10 h-[82vh] bg-black rounded-2xl mr-24 p-12">
      <div className="relative">
        {user.profile?.user_image ? (
          <Avatar className="mx-auto h-72 w-72" data-id="element-3">
            <AvatarImage
              src={`${user.profile?.user_image.includes("http") ? "" : MEDIA}${
                user.profile?.user_image
              }`}
              alt="Profile"
              data-id="element-4"
            />
            <AvatarFallback data-id="element-5">PS</AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-80 h-80 mx-auto text-8xl rounded-full flex justify-center items-center bg-purple">
            {user.profile?.user_name[0].toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
