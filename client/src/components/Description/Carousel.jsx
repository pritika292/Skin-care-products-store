import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MyCarousel.css";

function MyCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const CarouselSlide = ({ image, text, location }) => {
    return (
      <div className="carousel-slide">
        <div className="image-container">
          <img className="carousel-image" src={image} alt="Creams" />
          <div className="overlay-container">
            <h1>{text}</h1>
            <button className="btn-primary" onClick={() => window.location.href = location}>Know more</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <CarouselSlide image="/Images/Picture1.png" text="Discover more creams" location="https://www.cerave.com/" />
        <CarouselSlide image="/Images/Picture2.png" text="Shop our new skincare collection" location="https://www.cetaphil.com/us/" />
        <CarouselSlide image="/Images/Picture3.png" text="Check out our new range" location="https://www.firstaidbeauty.com/" />
      </Slider>
    </div>
  );
}

export default MyCarousel;
