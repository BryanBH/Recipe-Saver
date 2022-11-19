import "./recipe.scss";
import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const RecipeCard = ({ data }) => {
  return (
    <>
      <Col
        md={4}
        className="d-flex flex-column text-center recipe-card mb-3 justify-content-between"
        key={data.id}>
        <Link to={`/recipe/${data.id}`} className="link">
          <div>
            <img className="recipe-img" src={data.image} alt={data.title} />
          </div>
          <div>
            <h4>{data.title}</h4>
          </div>
        </Link>
      </Col>
    </>
  );
};

export default RecipeCard;
