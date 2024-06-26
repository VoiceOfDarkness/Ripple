import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  EditIcon,
  MapPinIcon,
  PlusIcon,
  Share2Icon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store/profile-slice";
import api from "@/helpers/request";
import { getProfile } from "@/store/profile-slice";
import { useRef, useEffect } from "react";
import ProfileFormSection from "./ProfileFormSection";

export const ProfileSection = ({ user }) => {
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const response = await api.patch(
      "user/profile",
      { user_image: file },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(profileActions.setProfile(response.data));
  };

  const getDate = (date) => {
    const localDate = new Date(date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[localDate.getMonth()]} ${localDate.getFullYear()}`;
  };

  return (
    <Card
      className="w-1/2 max-md:w-full bg-black border text-white"
      data-id="element-0"
    >
      <CardHeader data-id="element-1" className="h-2/5 mt-36">
        <div className="relative" data-id="element-2">
          {user.profile?.user_image ? (
            <Avatar className="mx-auto h-80 w-80" data-id="element-3">
              <AvatarImage
                src={`${
                  user.profile?.user_image.includes("http")
                    ? ""
                    : "http://localhost:8000/app/media/"
                }${user.profile?.user_image}`}
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
        <div className="mt-4 text-center" data-id="element-7">
          <h2
            className="flex items-center justify-center text-3xl font-semibold"
            data-id="element-8"
          >
            {`${user.profile?.first_name || ""} ${
              user.profile?.last_name || ""
            }`}
          </h2>
          <p
            className="flex items-center justify-center text-3xl text-gray-400"
            data-id="element-11"
          >
            {`@${user.profile?.user_name}`}
          </p>
          <div>
            <Button
              variant="outline"
              className="mt-4 bg-purple-600 text-white text-3xl p-8"
              data-id="element-13"
              onClick={handleUploadClick}
            >
              Upload photo
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent data-id="element-14">
        <div className="mt-6 text-left h-5/6" data-id="element-15">
          <div className="mb-2 flex items-center" data-id="element-16">
            <MapPinIcon
              className="mr-2 h-5 w-5 text-gray-400"
              data-id="element-17"
            />
            <span data-id="element-18">From</span>
            <span className="ml-auto" data-id="element-19">
              Azerbaijan
            </span>
          </div>
          <div className="mb-2 flex items-center" data-id="element-20">
            <CalendarIcon
              className="mr-2 h-5 w-5 text-gray-400"
              data-id="element-21"
            />
            <span data-id="element-22">Member since</span>
            <span className="ml-auto" data-id="element-23">
              {getDate(user.profile?.created_at)}
            </span>
          </div>
          <ProfileFormSection user={user} />
        </div>
      </CardContent>
    </Card>
  );
};
