import { useDispatch, useSelector } from "react-redux";
import GigsForm from "../components/Gigs/GigsForm";
import { useEffect } from "react";
import { getProfile } from "@/store/profile-slice";
import { Navigate } from "react-router-dom";

export default function CreateGigPage() {
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, profile?.is_freelancer]);

  return profile?.is_freelancer ? <GigsForm /> : <Navigate to="/profile" />;
}
