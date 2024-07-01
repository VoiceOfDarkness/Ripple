import { getGigs } from "@/store/gig-actions";
import { getProfile, getUser } from "@/store/profile-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import JobCard from "@/components/JobCards/JobCard";

export default function UserDetails() {
  const user = useSelector((state) => state.profile.user);
  const { userId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch]);

  return (
    <div className="mt-10 pb-20 bg-slate-950 rounded-2xl mr-24 p-12">
      <div className="flex flex-col gap-12">
        <div className="flex gap-12 items-center">
          <div className="relative">
            {user?.user.user_image ? (
              <Avatar className="mx-auto h-56 w-56" data-id="element-3">
                <AvatarImage
                  src={`${user.user?.user_image.includes("http") ? "" : MEDIA}${
                    user.user?.user_image
                  }`}
                  alt="Profile"
                  data-id="element-4"
                />
                <AvatarFallback data-id="element-5">PS</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-56 h-56 mx-auto text-8xl rounded-full flex justify-center items-center bg-purple">
                {user?.user.user_name[0].toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="text-4xl">
              {`${user?.user.first_name || ""} ${user?.user.last_name || ""} @${
                user?.user.user_name
              }`}
            </p>
          </div>
        </div>
        {user?.user.overview && (
          <div>
            <h1 className="mb-6 text-4xl font-semibold">About me</h1>
            <p className=" break-words pr-10">{user?.user.overview}</p>
          </div>
        )}

        <div className="mt-20 px-16">
          <h1 className="mb-6 text-4xl font-semibold">My gigs</h1>
          <Carousel
            className="text-black"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {user?.gigs.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 max-md:basis-full"
                >
                  <JobCard job={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
