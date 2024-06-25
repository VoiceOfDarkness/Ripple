// JobMain.js
import { useDispatch, useSelector } from "react-redux";
import JobCardsList from "../JobCards/JobCardsList";
import { useEffect } from "react";
import { getGigs } from "../../store/gig-actions";
import { useSearchParams } from "react-router-dom";
import { searchGig } from "../../store/gig-actions";

export default function JobMain() {
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const gigs = useSelector((state) => state.gigs.gigs) || [];
  const searchedGig = useSelector((state) => state.gigs.searchedGigs) || [];

  useEffect(() => {
    dispatch(getGigs());
    dispatch(searchGig(query.get("search")));
  }, [dispatch, searchGig.length, query]);

  return (
    <div>
      <JobCardsList jobs={query.get("search") ? searchedGig : gigs} />
    </div>
  );
}
