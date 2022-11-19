import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authActions";
import { useNavigate } from "react-router-dom";
import { updateError } from "../../redux/auth/authSlice";

const SignIn = ({ type }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(user));
  };
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const disabled =
    user.email.length === 0 || user.password.length === 0 || loading;

  const DiplayError = () => {
    if (error) {
      setTimeout(() => {
        dispatch(updateError(null));
      }, 6000);
    }
    return error && <h3 className="text-center">{error}</h3>;
  };
  useEffect(() => {
    if (currentUser) navigate("/user-profile");
  }, [currentUser, navigate]);
  return (
    <>
      <h1 className="text-center mt-3">Sign In</h1>
      {/* Error Component */}
      <DiplayError />

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                placeholder="Email Address"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-center align-items-center">
            <Button
              type="submit"
              disabled={disabled}
              className="bg-light text-Primary">
              {type}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SignIn;
