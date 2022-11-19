import "./styles.css";
import React, { useState } from "react";
import {
  Col,
  Form,
  InputGroup,
  Button,
  Modal,
  Container,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeCategories } from "../../redux/recipes/recipeActions";
import { updateError } from "../../redux/recipes/recipeSlice";

const SearchCuisine = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.recipes);
  async function handleSubmit(event) {
    event.preventDefault();
    const isValid = cuisines.some(
      (cuisine) => cuisine.toLowerCase() === search.toLowerCase()
    );

    if (isValid) {
      dispatch(fetchRecipeCategories(search));
    } else {
      alert(
        `Must be an aceptable cuisine type. Click on "See available cuisines" for more info.`
      );
    }
  }
  const DisplayError = () => {
    if (error) {
      setTimeout(() => {
        dispatch(updateError(null));
      }, 6000);
    }
    return error && <h2> {error}</h2>;
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {<DisplayError />}
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
        <p
          onClick={handleShow}
          className="text-end available text-Primary fw-bold mb-0">
          See available cuisines
        </p>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          size="lg"
          className="text-center">
          <Modal.Header closeButton>
            <Modal.Title className="text-end me-auto">
              Available Cuisines
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row className="mb-3">
                <Col sm={3}>African</Col>
                <Col>American</Col>
                <Col sm={3}>British</Col>
                <Col sm={3}>Cajun</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>Caribbean</Col>
                <Col sm={3}>Chinese</Col>
                <Col sm={3}>British</Col>
                <Col sm={3}>Eastern European</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>European</Col>
                <Col sm={3}>French</Col>
                <Col sm={3}>German</Col>
                <Col sm={3}>Greek</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>Indian</Col>
                <Col sm={3}>Irish</Col>
                <Col sm={3}>Italian</Col>
                <Col sm={3}>Japanese</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>Jewish</Col>
                <Col sm={3}>Korean</Col>
                <Col sm={3}>Latin American</Col>
                <Col sm={3}>Mediterranean</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>Mexican</Col>
                <Col sm={3}>Middle Eastern</Col>
                <Col sm={3}>Nordic</Col>
                <Col sm={3}>Southern</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>Spanish</Col>
                <Col sm={3}>Thai</Col>
                <Col sm={3}>Vietnamese</Col>
                <Col sm={3}></Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </Col>
    </>
  );
};

const cuisines = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "British",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];
export default SearchCuisine;
