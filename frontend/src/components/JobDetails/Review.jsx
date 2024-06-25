import { useDispatch } from "react-redux";
import { createReview, reviewActions } from "@/store/review-slice";
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uiMessage } from "@/helpers/uiMessage";

export default function Reviews({ gig }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(null);
  const commentRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentRef.current.value.length >= 1 && rating >= 1) {
      dispatch(createReview(gig.id, commentRef.current.value, rating));
      commentRef.current.value = "";
      setRating(0);
      setHover(0);
      setError(null);
      reviewActions.setStatus(null);
    } else {
      setError(
        "Please write a comment with 1 character and rating at least 1 star"
      );
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Textarea
          className="bg-black text-3xl border-white border"
          placeholder="Write your comment"
          ref={commentRef}
          rows="6"
        />
        <div className="flex">
          {[1, 2, 3, 4, 5].map((rate) => (
            <StarIcon
              key={rate}
              onClick={() => setRating(rate)}
              onMouseEnter={() => setHover(rate)}
              onMouseLeave={() => setHover(rating)}
              color={(hover || rating) >= rate ? "#ffc107" : "#e4e5e9"}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        {error && <p className="text-red">{error}</p>}
        <Button
          className="bg-purple-500 w-1/3 text-3xl bg-purple text-white px-12 py-10 rounded-xl"
          type="submit"
        >
          Make a review
        </Button>
      </form>
    </div>
  );
}
