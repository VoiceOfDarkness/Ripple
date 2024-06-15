// JobMain.js
import { useDispatch, useSelector } from "react-redux";
import JobCardsList from "../JobCards/JobCardsList";
import { useEffect } from "react";
import { getGigs } from "../../store/gig-actions";

export default function JobMain() {
  const dispatch = useDispatch();
  const gigs = useSelector((state) => state.gigs.gigs);

  useEffect(() => {
    dispatch(getGigs());
  }, [dispatch]);

  return (
    <div>
      <JobCardsList jobs={gigs || []} />
    </div>
  );
}
