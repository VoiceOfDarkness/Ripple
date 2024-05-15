import heroImg from "../../assets/hero-img.png";
import { Instagram } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Facebook } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import Box from "../../layouts/Box";

export default function Hero() {
  const icons = [
    <Instagram className="m-1 text-grey icon" />,
    <Twitter className="m-1 text-grey icon" />,
    <Facebook className="m-1 text-grey icon" />,
    <LinkedIn className="m-1 text-grey icon" />,
  ];
  return (
    <div
      className="w-full h-screen z-0 bg-no-repeat bg-cover bg-right flex items-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <Box className="reletive z-20 h-full text-white flex flex-col justify-evenly">
        <div className="w-1/2 tracking-wider pr-52 max-lg:w-full">
          <h1 className="text-7xl leading-snug font-bold">
            Find your <span className="text-purple">Job</span> with Us!
          </h1>
          <p>
            Meet clients you’re excited to work with and take your career or
            business to new heights.
          </p>
        </div>

        <div>
          <ul className="flex gap-5">
            {icons.map((item, index) => (
              <li key={index} className="bg-darkgrey inline p-2 rounded-full">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </div>
  );
}
