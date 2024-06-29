import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteGig, getGigs } from "@/store/gig-actions";
import { Link } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { MEDIA } from "@/helpers/config";

export const ProfileGigsSection = ({ user }) => {
  const dispatch = useDispatch();
  const gigs = useSelector((state) => state.gigs.gigs) || [];
  const [updateCount, setUpdateCount] = useState(0); // Yeni state tanımı

  useEffect(() => {
    dispatch(getGigs());
  }, [dispatch, updateCount]); // updateCount değiştiğinde getGigs çağrılır

  const filteredGigs = gigs?.filter(
    (gig) => gig?.freelancer.user.id === user.profile?.id
  );

  const handleDeleteGig = (gigId) => {
    dispatch(deleteGig(gigId)).then(() => {
      setUpdateCount((prevCount) => prevCount + 1); // State'i güncelle
    });
  };

  return (
    <Card
      className="w-1/2 max-md:w-full bg-black border text-white"
      data-id="element-29"
    >
      <CardHeader data-id="element-30">
        <CardTitle
          className="border-b-2 border-purple-500 pb-2"
          data-id="element-31"
        >
          ACTIVE GIGS
        </CardTitle>
      </CardHeader>
      <CardContent data-id="element-32">
        <ScrollArea className="h-[85rem]">
          <div
            className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 3xl:grid-cols-3"
            data-id="element-33"
          >
            {filteredGigs.map((item) => (
              <div
                className="rounded-lg bg-gray-900 p-4 shadow-md"
                key={item.id}
                data-id="element-34"
              >
                <img
                  src={`${MEDIA}${item.images[0].filename}`}
                  alt="Gig"
                  className="h-56"
                  data-id="element-35"
                />
                <p className="mt-2 text-white" data-id="element-36">
                  {item.title}
                </p>
                <div
                  className="mt-2 flex items-center justify-between"
                  data-id="element-37"
                >
                  <span
                    className="font-semibold text-white"
                    data-id="element-39"
                  >
                    ${item.price}
                  </span>
                  <span className="flex items-center gap-3">
                    <Star />
                    {Number(item.rating).toFixed(1)}({item.num_reviews})
                  </span>
                  <button onClick={() => handleDeleteGig(item.id)}>
                    Delete gig
                  </button>
                </div>
              </div>
            ))}
            <Link
              to="/creategig"
              className="flex items-center justify-center rounded-lg bg-gray-900 p-4 shadow-md"
              data-id="element-41"
            >
              <PlusIcon
                className="mr-2 h-10 w-10 text-gray-400"
                data-id="element-42"
              />
              <span className="text-gray-400" data-id="element-43">
                Create a new Gig
              </span>
            </Link>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
