import { Menu } from "@mui/icons-material";

export default function MenuNavBar() {
  return (
    <div className="bg-transparent w-full z-10 top-0 pt-16 px-14 flex text-white items-center justify-between">
      <h1 className="text-6xl font-black">Ripple</h1>
      <div className="max-md:hidden">
        <ul className="flex gap-14 items-center font-semibold text-3xl">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Workshop</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
          <li className="border border-white hover:bg-white hover:text-black rounded-lg border-solid p-4 px-10 transition-all duration-500">
            <a href="/">Login</a>
          </li>
          <li className="rounded-lg p-4 px-10 hover:bg-cardBlack hover:text-white border-white border bg-white text-black transition-all duration-500">
            <a href="/">Sign up</a>
          </li>
        </ul>
      </div>
      <div className="hidden max-md:block">
        <Menu style={{ width: "6rem", height: "6rem" }} />
      </div>
    </div>
  );
}
