import img1 from "../assets/service-img-0.webp";
import img2 from "../assets/service-img-1.webp";
import img3 from "../assets/service-img-2.webp";
import img4 from "../assets/service-img-3.webp";
import img5 from "../assets/service-img-4.webp";
import img6 from "../assets/service-img-5.webp";
import Card from "./Card";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const infos = [
    { text: "Showcase your story", title: "Book Covers", img: img1 },
    { text: "Go global", title: "Translation", img: img2 },
    { text: "Reach more customers", title: "Social Media", img: img3 },
    { text: "Unlock growth online", title: "SEO", img: img4 },
    { text: "Color your dreams", title: "Illustration", img: img5 },
    { text: "Learn your business", title: "Data Entry", img: img6 },
    { text: "Learn your business", title: "Data Entry", img: img6 },
    { text: "Learn your business", title: "Data Entry", img: img6 },
    { text: "Learn your business", title: "Data Entry", img: img6 },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {infos.map((item, index) => (
          <Card
            text={item.text}
            servicesImg={item.img}
            title={item.title}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
}
