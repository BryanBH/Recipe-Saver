import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSavedRecipes } from "../redux/recipes/recipeActions";
import ProfileCarousel from "../components/globalComponents/profileCarousel/ProfileCarousel";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { userRecipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const fullName = currentUser.firstName + " " + currentUser.lastName;

  useEffect(() => {
    dispatch(getSavedRecipes());
  }, [dispatch]);

  // Carousel slider settings
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: userRecipes.length <= 2 ? 1 : 3,
    slidesToScroll: userRecipes.length <= 2 ? 1 : 3,
    swipeToSlide: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    pauseOnHOver: true,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: userRecipes.length < 2 ? 2 : 3,
          slidesToScroll: userRecipes.length < 2 ? 2 : 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: userRecipes.length < 2 ? 2 : 3,
          slidesToScroll: userRecipes.length < 2 ? 2 : 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: userRecipes.length < 2 ? 2 : 3,
          slidesToScroll: userRecipes.length < 2 ? 2 : 3,
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
  return (
    <>
      {currentUser && (
        <Container >
          <Row>
            <Col className="text-center">
              <h1>{fullName}</h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-center">
              <h2>Saved Recipes</h2>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center mb-5">
            {userRecipes.length > 0 && (
              <ProfileCarousel
                userRecipes={userRecipes}
                sliderSettings={settings}
              />
            )}
          </Row>
        </Container>
      )}
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
export default UserProfile;
