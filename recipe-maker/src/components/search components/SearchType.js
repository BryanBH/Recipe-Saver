import "./styles.css";
import React, { useState } from "react";
import {
  Col,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fecthRecipesByType } from "../../redux/recipes/recipeActions";

const SearchType = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    
    dispatch(fecthRecipesByType(search))
    
  }

  return (
    <>
      <Col className="">
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="text"
              value={search}
              placeholder="Search Recipes"
              onChange={(event) => setSearch(event.target.value)}
            />
            <Button className="bg-Dark" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
        </Form>
      </Col>
    </>
  );
};

export default SearchType;
