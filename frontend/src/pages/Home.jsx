import MenuNavBar from "../components/Header/NavBar";
import Hero from "../components/Header/Hero";
import MainSlider from "../components/Slider";
import Box from "../layouts/Box";
import Footer from "../components/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <MenuNavBar />
      <Hero />
      <Box className="flex flex-col gap-12 relative text-white font-thin m-auto py-32">
        <h1 className="text-7xl font-semibold">Popular Services</h1>
        <MainSlider />
      </Box>
      <div className="border-t border-white w-full">
        <Box>
          <Footer />
        </Box>
      </div>
    </>
  );
}
