import React from "react";
import Slider from "react-slick";
import "./slider.css";
import { useSelector } from "react-redux";

const Carousel = ({ children, sliderSettings }) => {
  const settings = sliderSettings ? sliderSettings : Settings;
  const { userRecipes } = useSelector((state) => state.recipes);

  const width = userRecipes.length <= 2 ? "200px" : "";
  return (
    <>
      <Slider
        {...settings}
        style={{ height: "500px" }}
        className="d-flex justify-conter-center align-items-center w-auto">
        {children}
      </Slider>
    </>
  );
};
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "rgba(218, 223, 225,1)",
      }}
      onClick={onClick}
    />
  );
};
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "rgba(218, 223, 225,1)",
      }}
      onClick={onClick}
    />
  );
};

const Settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  swipeToSlide: false,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 10000,
  pauseOnHOver: true,
  cssEase: "linear",
  className: "testing",
  useCSS: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
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
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export default Carousel;
