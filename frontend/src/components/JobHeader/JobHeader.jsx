import { Menu } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import JobSetting from "../Icons/JobsSetting";
import { JobsComment } from "../Icons/JobsComment";
import JobsAlert from "../Icons/JobsAlert";

export default function JobHeader() {
  return (
    <div className="bg-transparent  z-10 top-0 pt-12  flex text-white items-center ">
      <div className="max-md:hidden w-full">
        <ul className="flex items-center gap-20 text-3xl">
          <li className="w-1/3">
            <div className="flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-full placeholder-white px-6 py-3 outline-none bg-inputGray text-white transition-all duration-500  pr-12"
                />
                <SearchIcon
                  fontSize="large"
                  className="absolute large right-4 top-1/2 transform -translate-y-1/2 text-white"
                />
              </div>
            </div>
          </li>
          <li>
            <a href="/">Location...</a>
          </li>
          <div className="flex items-center justify-center pl-40 gap-5">
            <li>
              <a href="/">
                <div className="w-16 h-16 flex items-center justify-center bg-inputGray rounded-full">
                  <JobSetting />
                </div>
              </a>
            </li>
            <li>
              <label className="inline-flex cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </li>
          </div>
          <div className="flex items-center justify-center gap-5">
            <li>
              <a href="/">
                <JobsComment />
              </a>
            </li>
            <li>
              <a href="/">
                <JobsAlert />
              </a>
            </li>
          </div>
          <div className="flex gap-5">
            <a href="/">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-zinc-200 rounded-full"></div>
                <span className="ml-2">Username</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </a>
          </div>
        </ul>
      </div>
      <div className="hidden max-md:block">
        <Menu style={{ width: "6rem", height: "6rem" }} />
      </div>
    </div>
  );
}
