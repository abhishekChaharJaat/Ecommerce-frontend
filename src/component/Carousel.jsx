import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
    const settings = {
        dots: true,                  // Show navigation dots
        infinite: true,              // Continuous loop
        speed: 500,                  // Transition speed (ms)
        slidesToShow: 1,             // Number of slides visible at once
        slidesToScroll: 1,           // Number of slides to scroll
        autoplay: true,              // Enable autoplay
        autoplaySpeed: 3000,         // Autoplay interval (ms)
        cssEase: "linear",           // Smooth continuous scrolling
        pauseOnHover: false,         // Do not pause on hover
        arrows: false,               // Hide navigation arrows
        rtl: false                   // Ensure it doesn’t reverse in RTL mode
      };
      

  return (
    <div className="carousel-container w-full max-w-5xl mx-auto">
      <Slider {...settings}>
        {images?.map((image, index) => (
          <div key={index} className="p-2">  
            <img
              src={image}
              alt={`Product Image ${index + 1}`}
              className="w-full h-[395px] rounded-lg shadow-md object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
