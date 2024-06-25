import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendCode, verifyUser } from "../../../store/auth-actions";
import { useNavigate } from "react-router-dom";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let value = "";
    inputsRef.current.forEach((item) => (value += item.innerText));
    dispatch(verifyUser(value));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="my-auto flex flex-col gap-8">
      <h3 className="mb-16 text-5xl">Please verify your email</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <InputOTP maxLength={6} className="absolute">
          <InputOTPGroup className="w-full gap-3">
            {[0, 1, 2, 3, 4, 5].map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className="h-40 flex-1 text-7xl appearance-none rounded-xl text-center placeholder:text-white focus:border-purple focus:border-2 focus:outline-none"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <button
          type="submit"
          className={`bg-buttonPruple rounded-full p-8 w-1/2 hover:opacity-80 duration-150 mt-8`}
        >
          Verify
        </button>
      </form>

      <p className="mt-16">
        We send a code to your email open email and enter code in{" "}
        {formatTime(timeLeft)} minutes.{" "}
      </p>
      <p>
        If you can not recive the code please click.{" "}
        <span
          className="text-linkBlue cursor-pointer"
          onClick={() => {
            dispatch(resendCode());
            setTimeLeft(120);
          }}
        >
          Send again
        </span>
      </p>
    </div>
  );
}
