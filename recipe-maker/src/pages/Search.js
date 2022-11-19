import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RecipeListings from "../components/recipe/RecipeListings";
import { randomData } from "../data/randomRecipes";
import { resetRecipes } from "../redux/recipes/recipeSlice";
import { useDispatch } from "react-redux";
import SearchCuisine from "../components/search components/SearchCuisine";
import SearchType from "../components/search components/SearchType";
import SearchDiet from "../components/search components/SearchDiet";

/**
 * Search recipe component
 * @returns Search Recipe Page
 */
const Search = ({ searchParam }) => {
  const dispatch = useDispatch();
  const [randomRecipes, setrandomRecipes] = useState([]);

  const DisplayOptions = () => {
    switch (searchParam) {
      case "cuisine":
        return <SearchCuisine />;
      case "type":
        return <SearchType />;
      case "diet":
        return <SearchDiet />;
      default:
        return <SearchCuisine />;
    }
  };
  useEffect(() => {
    setrandomRecipes(randomData());

    return () => {
      setrandomRecipes([]);
      dispatch(resetRecipes());
    };
  }, [dispatch]);

  return (
    <>
      <Container className=" bg-light mt-3">
        <Row>
          <Col className="text-center" sm={12}>
            <h1>Recipe Finder</h1>
            <h2>Searching by {capitalizeFirstLetter(searchParam)}</h2>
          </Col>
        </Row>
        <Row>
          <DisplayOptions />
        </Row>
      </Container>
      <RecipeListings templateData={randomRecipes} />
    </>
  );
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default Search;
