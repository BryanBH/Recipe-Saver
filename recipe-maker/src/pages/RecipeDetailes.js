import React, { useEffect } from "react";
import { Button, Col, Container, Figure, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../styles/recipeDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  saveRecipeDetails,
  fetchRecipeInformation,
} from "../redux/recipes/recipeActions";
import {
  updateError,
  updateSuccess,
  resetCurrentRecipe,
} from "../redux/recipes/recipeSlice";

/**
 * Component that sets & displays the current Recipe recipe and its details
 * @returns current recipe details page
 */
const RecipeDetailes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, success, currentRecipe } = useSelector(
    (state) => state.recipes
  );
  const { currentUser } = useSelector((state) => state.auth);

  const regex = /(<([^>]+)>)/gi;

  const recipeInstructions = currentRecipe.instructions ? (
    <p>{currentRecipe.instructions.replace(regex, "")}</p>
  ) : (
    <p>
      View full instructions{" "}
      <a
        className="text-light fw-bold"
        href={currentRecipe.sourceUrl}
        target="_blank"
        rel="noreferrer">
        here
      </a>
    </p>
  );
  // properties being saved in DB
  const saveData = {
    id: currentRecipe.id,
    title: currentRecipe.title,
    image: currentRecipe.image,
    summary: currentRecipe.summary,
    sourceUrl: currentRecipe.sourceUrl,
    spoonacularSourceUrl: currentRecipe.spoonacularSourceUrl,
    readyInMinutes: currentRecipe.readyInMinutes,
    instructions: currentRecipe.instructions,
    cuisines: currentRecipe.cuisines,
    servings: currentRecipe.servings,
  };

  const handleSave = async () => {
    if (!currentUser) {
      dispatch(updateError("Must be Signed In"));
      setTimeout(() => {
        dispatch(updateError(null));
      }, 8000);
    }
    dispatch(saveRecipeDetails(saveData));
    setTimeout(() => {
      dispatch(updateSuccess(null));
    }, 8000);
  };

  const DisplayError = () => {
    return error && <h2 className="text-center">{error}</h2>;
  };

  const DisplaySuccess = () => {
    return (
      success && <h2 className="text-center">Reciped was saved successfuly</h2>
    );
  };

  useEffect(() => {
    dispatch(fetchRecipeInformation(id));

    return () => {
      dispatch(resetCurrentRecipe());
      dispatch(updateSuccess(null));
      dispatch(updateError(null));
    };
  }, [dispatch, id]);

  return (
    <>
      <DisplayError />
      <DisplaySuccess />
      <Container className="d-flex justify-content-center my-3 ">
        <Row>
          <Col
            className="d-none d-lg-flex justify-content-center align-items-center me-2"
            style={{ maxWidth: "500px" }}>
            <Figure>
              <Figure.Image
                src={currentRecipe.image}
                alt={currentRecipe.title}
                style={{ width: "auto", height: "500px", objectFit: "fill" }}
                className="rounded-5 shadow-lg"
              />
              <Figure.Caption className="text-end">
                Image &copy;{" "}
                <a className="text-Primary" href={currentRecipe.sourceUrl}>
                  {currentRecipe.creditsText}
                </a>
              </Figure.Caption>
            </Figure>
          </Col>
          <Col className="text-center text-light bg-darkAccent mx-2 p-3 rounded-5 shadow-lg ">
            <Row>
              <Col>
                <h2 className="fw-bold mt-3">{currentRecipe.title}</h2>
                <p>{currentRecipe.summary?.replace(regex, "")}</p>
              </Col>
            </Row>
            <Row>
              <h3 className="fw-bold">Recipe Instructions</h3>

              <Col
                className="customScroll"
                style={{ overflowY: "auto", height: "300px" }}>
                {recipeInstructions}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Button className="bg-light text-Primary" onClick={handleSave}>
                  Save Recipe
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecipeDetailes;
