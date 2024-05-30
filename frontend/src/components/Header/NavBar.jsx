import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function MenuNavBar() {
  return (
    <div className="bg-transparent w-full z-10 top-0 pt-16 px-14 flex text-white items-center justify-between">
      <h1 className="text-6xl font-black">Ripple</h1>
      <div className="max-md:hidden">
        <ul className="flex gap-14 items-center font-semibold text-3xl">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
          <li>
            <Link
              to="auth?mode=login"
              className="border border-white hover:bg-white hover:text-black rounded-lg border-solid p-4 px-10 transition-all duration-500"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="auth?mode=signup"
              className="rounded-lg p-4 px-10 hover:bg-cardBlack hover:text-white border-white border bg-white text-black transition-all duration-500"
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden max-md:block">
        <Menu style={{ width: "6rem", height: "6rem" }} />
      </div>
    </div>
  );
}
