// JobCard.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

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

  const handleToggle = (event) => {
    event.stopPropagation(); // Prevent triggering the handleClick
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  return (
    <div
      className="bg-black w-full shadow-md p-6 rounded-3xl cursor-pointer"
      onClick={handleClick}>
      <div className="flex w-full justify-between content-between">
        <div className="w-16 h-16 flex items-center justify-center bg-inputGray rounded-full"></div>
        {isExpanded ? (
          <BookmarkIcon className="text-white large" onClick={handleToggle} />
        ) : (
          <BookmarkBorderIcon
            className="text-white large"
            onClick={handleToggle}
          />
        )}
      </div>
      <h1 className="text-white font-bold mt-5">{job.title}</h1>
      <h2 className="text-white">{job.company}</h2>
      <div className="flex gap-3 mt-10">
        <InfoTag>{job.location}</InfoTag>
        <InfoTag>{job.postedAt}</InfoTag>
        <InfoTag>{job.contract}</InfoTag>
      </div>
      <div className="flex mt-10 gap-10">
        {job.isNew && (
          <span className="bg-red text-white py-1 px-3 rounded-3xl">New</span>
        )}
        {job.isFeatured && (
          <span className="bg-purple text-white py-1 px-3 rounded-3xl">
            Featured
          </span>
        )}
      </div>
      <div className="flex w-full justify-between content-between mt-10">
        <p className="text-PlaceHolderGray">{job.postedAt} minute ago</p>
        <p className="text-PlaceHolderGray">${job.cost}K/Mo</p>
      </div>
    </div>
  );
}
