import "./recipe.scss";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CarouselCard from "../globalComponents/carousel/CarouselCard";
import LoadingCard from "../globalComponents/skeletons/LoadingCard";

import { useSelector } from "react-redux";
import { updateError } from "../../redux/recipes/recipeSlice";

const RecipeListings = ({ templateData }) => {
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const DisplayRecipes = () => {
    if (recipes.length === 0) {
      return templateData.map((data, i) => {
        return (
          <Col
            sm={4}
            style={{ height: "500px" }}
            className="my-3"
            key={data.id}>
            <CarouselCard recipe={data} index={i} />
          </Col>
        );
      });
    } else {
      return recipes.map((data, i) => {
        return (
          <Col
            sm={4}
            style={{ height: "500px" }}
            className="my-3"
            key={data.id}>
            <CarouselCard recipe={data} index={i} />
          </Col>
        );
      });
    }
  };

  useEffect(() => {
    return () => {
      updateError(null);
    };
  });
  return (
    <Container>
      <Row className="my-3 text-center">
        <Col>
          <h5>Recipe Listings</h5>
        </Col>
      </Row>
      {error && (
        <Row>
          <Col>
            <h5 className="text-center">{error}</h5>
          </Col>
        </Row>
      )}
      {loading ? (
        <Row className="mb-3 ">
          <Col className="d-flex justify-content-center align-items-center mb-3">
            <LoadingCard />
          </Col>
          <Col className="d-flex justify-content-center align-items-center mb-3">
            <LoadingCard />
          </Col>
          <Col className="d-flex justify-content-center align-items-center mb-3">
            <LoadingCard />
          </Col>
        </Row>
      ) : (
        <Row className="mb-3">
          <DisplayRecipes />
        </Row>
      )}
    </Container>
  );
};

export default RecipeListings;
