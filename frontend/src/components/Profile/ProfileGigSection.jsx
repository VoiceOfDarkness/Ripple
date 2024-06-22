import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  EditIcon,
  MapPinIcon,
  PlusIcon,
  Share2Icon,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGigs } from "@/store/gig-actions";
import { Link } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";

export const ProfileGigsSection = ({ user }) => {
  const dispatch = useDispatch();
  const gigs = useSelector((state) => state.gigs.gigs) || [];

  useEffect(() => {
    dispatch(getGigs());
  }, [dispatch]);

  const filteredGigs = gigs?.filter(
    (gig) => gig.seller_id === user.profile?.id
  );

  return (
    <Card className="w-1/2 bg-black border text-white" data-id="element-29">
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
            {filteredGigs.map((item, index) => (
              <div
                className="rounded-lg bg-gray-900 p-4 shadow-md"
                key={item.id}
                data-id="element-34"
              >
                <img
                  src={`http://localhost:8000/app/media/${item.images[0].filename}`}
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
                  <span className="flex gap-3">
                    <Star />
                    {item.rating}({item.num_reviews})
                  </span>
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