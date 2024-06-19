// JobDetails.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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

const JobDetails = () => {
  const { jobId } = useParams();
  const gig = useSelector((state) => state.gigs.gig);
  const user = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGigById(jobId));
  }, [dispatch, jobId]);

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

  return (
    <div className="max-w-full flex flex-col gap-7 p-16 mt-10 mr-24 bg-black rounded-2xl text-white">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-12 text-purple-500">
            {gig.title}
          </h1>
          <div className="flex items-center mt-2">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="ml-1">{gig.rating}</span>
            <span className="ml-1 text-gray-500">({gig.num_reviews})</span>
          </div>
          <div className="flex items-center mt-4">
            <Avatar className="w-32 h-32">
              {gig?.freelancer?.user.user_image ? (
                <AvatarImage
                  src={`${
                    gig?.freelancer?.user.user_image.includes("http")
                      ? ""
                      : "http://localhost:8000/app/media/"
                  }${gig?.freelancer?.user.user_image}`}
                />
              ) : (
                <div className="w-16 h-16 rounded-full flex justify-center items-center bg-purple">
                  {gig?.freelancer?.user.user_name.toUpperCase()}
                </div>
              )}
            </Avatar>
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
                      src={`http://localhost:8000/app/media/${item.filename}`}
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
        {user?.id !== gig?.seller_id && (
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
        <Button className="bg-purple-500 text-3xl bg-purple text-white px-10 py-8 rounded">
          Contact me
        </Button>
      </section>
      <section className="mb-8">
        <h2 className="text-4xl font-bold">Reviews</h2>
        <Card className="mt-4 p-4 bg-inputGray text-white rounded">
          <CardContent>
            <div className="flex items-center">
              <Avatar className="text-black">
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h3 className="font-bold">bobsmith</h3>
                <div className="flex items-center text-gray-500">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="ml-1">Canada</span>
                </div>
                <div className="flex items-center mt-1">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span className="ml-1">5</span>
                </div>
              </div>
            </div>
            <p className="mt-2">
              Very professional and delivered on time. Will hire again!
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default JobDetails;
