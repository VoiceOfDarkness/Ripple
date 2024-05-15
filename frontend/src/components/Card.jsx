export default function Card({ servicesImg, text, title }) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-l p-2">
      <img src={servicesImg} alt="" />
      <div className="absolute z-30 top-0 p-4 pt-6">
        <p>{text}</p>
        <p className="text-2xl font-bold">{title}</p>
      </div>
    </div>
  );
}
