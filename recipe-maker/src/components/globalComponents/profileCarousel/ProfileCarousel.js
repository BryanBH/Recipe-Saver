import React from "react";
import Carousel from "../carousel/Carousel";
import { Col } from "react-bootstrap";
import CarouselCard from "../carousel/CarouselCard";

const ProfileCarousel = ({ userRecipes, sliderSettings }) => {

  return (
    <Carousel sliderSettings={sliderSettings}>
      {userRecipes.map((recipe, i) => {
        return (
          <Col key={i} className="" style={{ position: "relative" }}>
            <CarouselCard recipe={recipe} index={i} className="p-3"  />
          </Col>
        );
      })}
    </Carousel>
  );
};

export default ProfileCarousel;
