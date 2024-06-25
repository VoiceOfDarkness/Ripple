import LoginForm from "../components/LoginForm/LoginForm";
import signUpSvg from "../assets/SIGN-UP.svg";
import man from "../assets/man.svg";
import man2 from "../assets/man2.svg";
import Box from "../layouts/Box";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Google } from "@mui/icons-material";
import VerifyForm from "../components/LoginForm/VerifyForm/VerifyForm";

export default function AuthPage() {
  const [params] = useSearchParams();
  const mode = params.get("mode");
  const isLogin = mode === "login";

  return (
    <div
      style={{ backgroundImage: `url(${signUpSvg})` }}
      className="h-screen bg-no-repeat bg-cover flex items-center w-full p-16"
    >
      <div className="lg:w-5/12 w-full flex flex-col justify-between h-full">
        <Link to="/">
          <h1 className="font-bold text-6xl">Ripple</h1>
        </Link>

        {mode !== "verify" && (
          <>
            <div>
              <p className="text-textGray text-3xl font-semibold mb-1">
                {isLogin
                  ? "Join Workspace".toUpperCase()
                  : "Start for free".toUpperCase()}
              </p>
              <p className="text-4xl font-semibold">
                {isLogin
                  ? "Login to find work you love."
                  : "Sign up to find work you love."}{" "}
              </p>
            </div>

            <div className="mb-28 flex flex-col gap-7">
              <p className="mb-8">
                {isLogin ? "Don't have an account " : "Already a member? "}
                <Link
                  to={isLogin ? "?mode=signup" : "?mode=login"}
                  className="text-linkBlue"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </Link>
              </p>

              <Link
                to="http://localhost:8000/api/v1/auth/sign-in/google"
                className="flex justify-center gap-6 p-4 items-center border border-white w-1/2 rounded-xl hover:text-purple duration-200 hover:border-purple cursor-pointer"
              >
                <Google style={{ fontSize: "2rem" }} />
                <p>Continue with Google</p>
              </Link>

              <LoginForm mode={mode} />
            </div>
          </>
        )}

        {mode === "verify" && <VerifyForm />}
      </div>
      <div className="flex-1 w-6/12">
        <div
          style={{
            backgroundImage: `url(${mode === "login" ? man : man2})`,
            backgroundPositionX: "65%",
            backgroundPositionY: "15%",
          }}
          className="hidden lg:block flex-1 h-screen bg-no-repeat bg-auto"
        ></div>
      </div>
    </div>
  );
}
