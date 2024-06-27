import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MapPinIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { deleteReview } from "@/store/review-slice";

export default function ReviewList({ reviews, user_id }) {
  const dispatch = useDispatch();

  return (
    reviews.length !== 0 && (
      <section className="mb-8">
        <h2 className="text-4xl font-bold">Reviews</h2>
        {reviews
          ?.slice()
          .reverse()
          .map((item, index) => (
            <Card
              className="mt-4 p-4 bg-inputGray text-white rounded"
              key={index}
            >
              <CardContent>
                <div className="flex items-center">
                  {item.user?.user_image ? (
                    <img
                      src={`${
                        item.user.user_image.includes("http")
                          ? ""
                          : import.meta.env.VITE_APP_MEDIA_URL
                      }${item.user.user_image}`}
                      className=" w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full flex justify-center items-center bg-purple">
                      {item.user.user_name[0].toUpperCase()}
                    </div>
                  )}
                  <div className="ml-4">
                    <h3 className="font-bold">{item.user.user_name}</h3>
                    <div className="flex items-center text-gray-500">
                      <MapPinIcon className="w-6 h-6" />
                      <span className="ml-1">Azerbaijan</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <StarIcon className="w-6 h-6 text-yellow-500" />
                      <span className="ml-1">{item.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="mt-2">{item.comment}</p>
                  {user_id === item.user.id && (
                    <Button
                      className="bg-purple-500 text-2xl bg-purple text-white py-6 rounded-xl"
                      type="submit"
                      onClick={() => {
                        dispatch(deleteReview(item.id));
                      }}
                    >
                      Delete review
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </section>
    )
  );
}
