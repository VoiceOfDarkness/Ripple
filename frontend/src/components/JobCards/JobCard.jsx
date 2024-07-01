// JobCard.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "@mui/icons-material";
import { MEDIA } from "@/helpers/config";

const InfoTag = ({ children }) => {
  return (
    <span className="bg-inputGray text-white py-1 px-6 rounded-xl mx-1">
      {children}
    </span>
  );
};

export default function JobCard({ job }) {
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
      className="bg-black w-full shadow-md rounded-3xl cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div className="w-full h-[23rem] bg-inputGray">
        <img
          src={`${MEDIA}${job.images[0].filename}`}
          alt="gig-img"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h1 className="text-white font-bold mt-5">{job.title}</h1>
        <h2 className="text-white">{job.company}</h2>
        <div className="flex gap-3 text-white mt-10 items-center">
          <div className="flex items-center gap-1">
            <Star style={{ marginBottom: "2px" }} />
            <span>{Number(job.rating).toFixed(1)}</span>
          </div>
          <p>({job.num_reviews})</p>
        </div>
        {job.category?.name && (
          <div className="flex mt-10 gap-10">
            <p>{job.category.name}</p>
          </div>
        )}

        <div className="flex w-full justify-between content-between mt-10">
          <p className="text-PlaceHolderGray">From ${job.price}</p>
        </div>
      </div>
    </div>
  );
}
