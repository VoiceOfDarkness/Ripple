import { useSelector, useDispatch } from "react-redux";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { getCategories } from "../../store/category-actions";

export default function JobCardsList({ jobs }) {
  const [currentCategory, setCurrentCategory] = useState("");
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const filteredJobs =
    currentCategory === ""
      ? jobs
      : jobs.filter((job) => {
          return job.category.id === currentCategory;
        });

  return (
    <>
      <div
        className="mt-24 overflow-x-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <ul className="flex gap-6 text-black font-semibold">
          <li
            className="bg-white p-4 rounded-full cursor-pointer"
            onClick={() => setCurrentCategory("")}
          >
            All
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-full cursor-pointer"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              onClick={() =>
                setCurrentCategory((currentCategory) =>
                  currentCategory === category.id ? "" : category.id
                )
              }
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pr-20 gap-4">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
