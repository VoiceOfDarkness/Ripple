import comingSoon from "../assets/coming-soon.svg";

export default function Payment() {
  return (
    <div className="p-16 relative">
      <div className="h-full w-1/2 max-lg:hidden">
        <img src={comingSoon} alt="coming soon img" />
      </div>
      <div className="mb-28 max-lg:static absolute bottom-[20rem] left-[72rem]">
        <p className="text-[15rem] max-3xl:text-[8rem]">Coming soon</p>
      </div>
    </div>
  );
}
