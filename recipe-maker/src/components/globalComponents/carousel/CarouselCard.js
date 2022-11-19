import React from "react";
import { Card } from "react-bootstrap";
import "./carouselCard.css";
import { Link } from "react-router-dom";
import imagePlaceholder from "../../../images/No-Image-Placeholder.svg.png";
import DeleteRecipeButton from "../deleteRecipeButton/DeleteRecipeButton";
const CarouselCard = ({ recipe, index }) => {
  return (
    <>
      <Card className="carousel-card d-flex justify-content-center align-items-center mx-3 shadow-sm">
        <Link to={`/recipe/${recipe.id}`}>
          <Card.Img
            variant="top"
            className="mt-2 px-2 rounded-3"
            src={recipe.image ? recipe.image : imagePlaceholder}
            style={{ height: "250px", width: "100%" }}
          />
          <Card.Body
            className=""
            style={{ height: "200px", overFlowY: "auto" }}>
            <Card.Title className="text-center">
              <strong>{recipe.title}</strong>
            </Card.Title>
            <Card.Text>
              {recipe.readyInMinutes ? (
                <>
                  Ready in: {recipe.readyInMinutes} minutes <br></br>
                </>
              ) : null}
              {recipe.servings ? <>Servings: {recipe.servings}</> : null}
            </Card.Text>
          </Card.Body>
        </Link>
        <DeleteRecipeButton recipeId={recipe._id} />
      </Card>
    </>
  );
};

export default CarouselCard;
