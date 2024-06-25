import notFound from "../assets/not-found.svg";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="bg-black p-44 flex justify-center items-center h-screen w-screen">
      <div className="w-1/2 flex flex-col gap-7">
        <h1 className="text-8xl">404 NOT FOUND</h1>
        <div className="flex gap-8 items-center">
          <p className="text-4xl">Go back to</p>
          <Link to="/" className="text-5xl">
            <h1 className="font-bold">Ripple</h1>
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <img src={notFound} alt="not found image" />
      </div>
    </div>
  );
}
