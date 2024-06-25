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
      {jobs.length === 0 ? (
        <div className="mt-32 text-6xl">Not found gig</div>
      ) : (
        <>
          <div
            className="mt-24 mr-20 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <ul className="flex gap-6 text-black font-semibold w-max">
              {categories.length !== 0 && (
                <li
                  key="all"
                  className={`p-4 rounded-full transition-all duration-300 cursor-pointer ${
                    currentCategory === "" ? "bg-purple text-white" : "bg-white"
                  }`}
                  onClick={() => setCurrentCategory("")}
                >
                  All
                </li>
              )}
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-full transition-all duration-300 cursor-pointer ${
                    currentCategory === category.id
                      ? "bg-purple text-white"
                      : "bg-white"
                  }`}
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
          <div className="mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 pr-20 gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
