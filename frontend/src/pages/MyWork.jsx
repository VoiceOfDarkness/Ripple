import { useDispatch, useSelector } from "react-redux";
import JobCardsList from "../components/JobCards/JobCardsList";
import { useEffect } from "react";
import { getGigs } from "../store/gig-actions";
import { getProfile } from "../store/profile-slice";

export default function MyJobPage() {
  const dispatch = useDispatch();
  const gigs = useSelector((state) => state.gigs.gigs);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getGigs());
    dispatch(getProfile());
  }, [dispatch]);

  const filteredGigs = gigs?.filter(
    (gig) => gig?.freelancer.user.id === profile?.id
  );

  return (
    <div>
      <JobCardsList jobs={filteredGigs || []} />
    </div>
  );
}
