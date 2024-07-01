// JobMain.js
import { useDispatch, useSelector } from "react-redux";
import JobCardsList from "../JobCards/JobCardsList";
import { useEffect, useState } from "react";
import { getGigs } from "../../store/gig-actions";
import { useSearchParams } from "react-router-dom";
import { searchGig } from "../../store/gig-actions";

export default function JobMain() {
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const gigs = useSelector((state) => state.gigs.gigs);
  const searchedGig = useSelector((state) => state.gigs.searchedGigs) || [];
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getGigs(currentPage));
    dispatch(searchGig(query.get("search")));
  }, [dispatch, searchGig.length, query, currentPage]);

  // useEffect(() => {
  //   if (gigs.current_page && gigs.current_page !== currentPage) {
  //     setCurrentPage(gigs.current_page);
  //   }
  // }, [currentPage]);

  return (
    <div className="pb-12">
      <JobCardsList
        jobs={query.get("search") ? searchedGig : gigs?.data || []}
        totalItems={gigs?.total_items}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}
