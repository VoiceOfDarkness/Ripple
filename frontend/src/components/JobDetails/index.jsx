// JobDetails.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { StarIcon, MapPinIcon, GlobeIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getGigById } from "../../store/gig-actions";
import { createOrder } from "../../store/order-slice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Reviews from "./Review";
import ReviewList from "./ReviewList";
import { chatActions } from "@/store/chat-slice";

const JobDetails = () => {
  const { jobId } = useParams();
  const gig = useSelector((state) => state.gigs.gig);
  const user = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.reviews.status);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGigById(jobId));
  }, [dispatch, jobId, status]);

  if (!gig) {
    return (
      <div className="bg-black mt-10 mb-10 mr-24 text-white p-10 rounded-3xl">
        Gig not found
      </div>
    );
  }

  const handleClick = () => {
    dispatch(createOrder(gig.seller_id, gig.id, undefined, gig.price));
  };

  const handleContact = () => {
    dispatch(chatActions.setReciver(gig?.freelancer.user.id));
    navigate("/chat");
  };

  return (
    <div className="max-w-full flex flex-col gap-7 p-16 mt-10 mr-24 bg-black rounded-2xl text-white">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-12 text-purple-500">
            {gig.title}
          </h1>
          <div className="flex items-center mt-2">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="ml-1">{Number(gig.rating).toFixed(1)}</span>
            <span className="ml-1 text-gray-500">({gig.num_reviews})</span>
          </div>
          <div className="flex items-center mt-4">
            {gig?.freelancer?.user.user_image ? (
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={`${
                    gig?.freelancer?.user.user_image.includes("http")
                      ? ""
                      : "http://backend:8000/app/media/"
                  }${gig?.freelancer?.user.user_image}`}
                />
              </Avatar>
            ) : (
              <div className="w-32 h-32 text-4xl rounded-full flex justify-center items-center bg-purple">
                {gig?.freelancer?.user.user_name[0].toUpperCase()}
              </div>
            )}
            <div className="ml-4 flex flex-col gap-3">
              <h2 className="text-3xl font-bold text-purple-500">
                {gig?.freelancer?.user.user_name}
              </h2>
              <div className="flex items-center text-gray-500">
                <MapPinIcon className="w-8 h-8" />
                <span className="ml-1">Azerbaijan</span>
              </div>
              <div className="flex items-center text-gray-500">
                <GlobeIcon className="w-8 h-8" />
                <span className="ml-1">I speak Azerbaijani, English</span>
              </div>
              <div className="text-gray-500">591 orders completed</div>
            </div>
          </div>
        </div>
      </header>
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-purple-500">
          Python Developer, Data Extraction Specialist
        </h2>
        <p className="mt-2">
          Hello there! My name is Kawsar, and I'm your go-to Python developer. I
          specialize in data extraction, web scraping, web automation, custom
          scripts, API development, and other related services.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-3xl font-bold">About this Gig</h2>
        <p className="mt-2">{gig.description}</p>
        <div className="mt-4 flex">
          <Carousel
            className="w-1/3 text-black"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {gig?.images?.map((item, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <img
                      src={`http://backend:8000/app/media/${item.filename}`}
                      alt=""
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {user?.id !== gig?.freelancer.user.id && (
          <Button
            className="bg-purple-500 mt-12 text-3xl bg-purple text-white px-10 py-8 rounded"
            onClick={handleClick}
          >
            Order
          </Button>
        )}
      </section>
      <section className="mb-8">
        <h2 className="font-bold text-3xl text-purple-500">
          Programming language
        </h2>
        <p className="mt-2">Python</p>
      </section>
      <section className="mb-8">
        {user?.id !== gig?.freelancer.user.id && (
          <Button
            className="bg-purple-500 text-3xl bg-purple text-white px-10 py-8 rounded"
            onClick={handleContact}
          >
            Contact me
          </Button>
        )}
      </section>
      {user?.id !== gig?.freelancer.user.id && <Reviews gig={gig} />}
      <ReviewList reviews={gig.reviews} user_id={user?.id} />
    </div>
  );
};

export default JobDetails;
