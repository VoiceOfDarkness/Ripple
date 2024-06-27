// JobCard.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/service-img-0.webp";
import { Star } from "@mui/icons-material";

const InfoTag = ({ children }) => {
  return (
    <span className="bg-inputGray text-white py-1 px-6 rounded-xl mx-1">
      {children}
    </span>
  );
};

export default function JobCard({ job }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // const handleToggle = (event) => {
  //   event.stopPropagation(); // Prevent triggering the handleClick
  //   setIsExpanded(!isExpanded);
  // };

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  return (
    <div
      className="bg-black w-full h-max shadow-md rounded-3xl cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div className="w-full h-1/2 bg-inputGray">
        <img
          src={`${import.meta.env.VITE_APP_MEDIA_URL}${job.images[0].filename}`}
          // src={img}
          alt="gig-img"
        />
      </div>
      <div className="p-5">
        <h1 className="text-white font-bold mt-5">{job.title}</h1>
        <h2 className="text-white">{job.company}</h2>
        <div className="flex gap-3 mt-10 items-center">
          <div className="flex items-center gap-1">
            <Star style={{ marginBottom: "2px" }} />
            <span>{Number(job.rating).toFixed(1)}</span>
          </div>
          <p>({job.num_reviews})</p>
        </div>
        <div className="flex mt-10 gap-10">
          {/* {job.isNew && (
          <span className="bg-red text-white py-1 px-3 rounded-3xl">New</span>
        )}
        {job.isFeatured && (
          <span className="bg-purple text-white py-1 px-3 rounded-3xl">
            Featured
          </span>
        )} */}
          <p>{job.category.name}</p>
        </div>
        <div className="flex w-full justify-between content-between mt-10">
          {/* <p className="text-PlaceHolderGray">{job.postedAt} minute ago</p> */}
          <p className="text-PlaceHolderGray">From ${job.price}</p>
        </div>
      </div>
    </div>
  );
}
