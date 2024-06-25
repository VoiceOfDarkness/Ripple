import { useState, useRef } from "react";
import { VisibilityOffOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { changePassword } from "@/store/auth-actions";

export default function Settings() {
  const [visible, setVisible] = useState([false, false]);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changePassword(
        passwordRef.current.value,
        confirmPasswordRef.current.value
      )
    );
  };
  return (
    <div className="mt-10 mr-24 bg-black rounded-3xl h-[80vh] p-10">
      <h1 className="text-4xl">Change password</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type={visible[0] ? "text" : "password"}
            name="password"
            ref={passwordRef}
            placeholder="Current password"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
          />
          <span
            className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() =>
              setVisible((prevState) => [!prevState[0], prevState[1]])
            }
          >
            <VisibilityOffOutlined
              style={{
                fontSize: "3rem",
                color: visible[0] ? "#412E76" : "white",
              }}
            />
          </span>
        </div>
        <div className="relative">
          <input
            type={visible[1] ? "text" : "password"}
            name="password"
            ref={confirmPasswordRef}
            placeholder="New password"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
          />
          <span
            className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() =>
              setVisible((prevState) => [prevState[0], !prevState[1]])
            }
          >
            <VisibilityOffOutlined
              style={{
                fontSize: "3rem",
                color: visible[1] ? "#412E76" : "white",
              }}
            />
          </span>
        </div>
        <button type="submit" className="bg-purple px-6 py-8 rounded-xl">
          Change password
        </button>
      </form>
    </div>
  );
}
