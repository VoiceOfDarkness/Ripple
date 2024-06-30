import { useState, useRef } from "react";
import { VerifiedUser, VisibilityOffOutlined } from "@mui/icons-material";
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
    <div className="flex h-[75vh] mt-14 mr-24 rounded-2xl bg-black overflow-hidden">
      <div className=" text-white p-5 border-r h-full">
        <ul className="space-y-4 p-10">
          <li className="font-bold flex gap-5 justify-center items-center text-3xl cursor-pointer">
            <span>
              <VerifiedUser style={{ fontSize: "2.23rem" }} />
            </span>
            <span className="max-md:hidden"> Security & Password</span>
          </li>
        </ul>
      </div>
      <div className="p-20 w-1/2 max-md:w-full text-white">
        <h1 className="text-4xl mb-20">Change password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={visible[0] ? "text" : "password"}
              name="password"
              ref={passwordRef}
              placeholder="Current password"
              className="bg-inputBack py-4 px-8 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
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
              className="bg-inputBack py-4 px-8 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
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
          <button type="submit" className="bg-purple py-4 rounded-xl w-1/2">
            Change password
          </button>
        </form>
      </div>
    </div>
  );
}
