import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../redux/auth/authActions";
import { updateError } from "../../redux/auth/authSlice";

const Register = ({ type }) => {
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    const { value } = event.target;
    setUser({ ...user, [event.target.name]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords must match");
      return;
    } else {
      setUser({ ...user, email: user.email.toLowerCase() });
      dispatch(signUpUser(user));
    }
  }

  const disabled =
    user.firstName.length === 0 ||
    user.lastName.length === 0 ||
    user.email.length === 0 ||
    user.password.length === 0 ||
    user.confirmPassword.length === 0 ||
    loading;

  const DiplayError = () => {
    if (error) {
      setTimeout(() => {
        dispatch(updateError(null));
      }, 6000);
    }
    return error && <h3 className="text-center">{error}</h3>;
  };
  // if registration was succesfull, navigate users to login page
  useEffect(() => {
    if (success) navigate("/login");
  }, [success, navigate]);

  return (
    <>
      <h1 className="text-center mt-3">Register</h1>

      {/* render error message if any */}
      <DiplayError />
      <Form onSubmit={handleSubmit} className="mx-3">
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                placeholder="First Name"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                placeholder="First Name"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
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
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center mb-3">
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

export default Register;
