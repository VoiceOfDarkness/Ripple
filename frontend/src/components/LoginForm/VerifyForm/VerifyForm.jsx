import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../../store/auth-actions";
import { useNavigate } from "react-router-dom";

export default function VerifyForm() {
  const [error, setError] = useState("");
  const [values, setValues] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(120);
  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyStatus = useSelector((state) => state.auth.verify);

  useEffect(() => {
    if (verifyStatus === 200) {
      navigate("/auth?mode=login");
    }
  }, [verifyStatus, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    setError("");

    // if (/^\d$/.test(value)) {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }

    if (index === 5) {
      const code = newValues.join("");
    }
    // } else if (/^\d+$/.test(value)) {
    if (value.length === 6) {
      const newValues = value.split("").slice(0, 6);
      setValues(newValues);
    }
    // }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyUser(values.join("")));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="my-auto">
      <h3 className="mb-16 text-5xl">Please verify your email</h3>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex gap-4">
          {[0, 1, 2, 3, 4, 5].map((_, index) => (
            <input
              key={index}
              type="number"
              maxLength="1"
              min={0}
              max={9}
              value={values[index]}
              className="w-full h-52 flex-1 text-7xl bg-inputBack appearance-none rounded-xl text-center placeholder:text-white focus:border-purple focus:border-2 focus:outline-none"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>
        <p className="mt-8 text-red">{error}</p>
        <button
          type="submit"
          className={`bg-buttonPruple rounded-full p-8 w-1/2 hover:opacity-80 duration-150 mt-8`}
        >
          Verify
        </button>
      </form>

      <p className="mt-16">
        We send a code to your email open email and enter code in{" "}
        {formatTime(timeLeft)} minutes
      </p>
    </div>
  );
}
