import React, { useState } from "react";
import { Col, Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchRecipesByDiet } from "../../redux/recipes/recipeActions";

const SearchDiet = () => {
  const [diet, setDiet] = useState("Gluten Free");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchRecipesByDiet(diet));
  };
  return (
    <>
      <Col
        className="d-flex justify-content-center align-items-center mb-3"
        >
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Select
              aria-label="diet select options"
              onChange={(event) => setDiet(event.target.value)}>
              <option value="Gluten Free">Gluten Free</option>
              <option value="Ketogenic">Ketogenic</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
              <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Pescetarian">Pescetarian</option>
              <option value="Paleo">Paleo</option>
              <option value="Primal">Primal</option>
              <option value="Low FODMAP">Low FODMAP</option>
              <option value="Whole30">Whole30</option>
            </Form.Select>
            <Button className="bg-Dark" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
        </Form>
      </Col>
    </>
  );
};

export default SearchDiet;
