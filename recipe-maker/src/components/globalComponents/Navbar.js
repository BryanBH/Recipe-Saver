import React, { useEffect } from "react";
import { Container, Nav, Navbar as NavbarBS, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/auth/authActions";
import { logout } from "../../redux/auth/authSlice";
/**
 *
 * @returns Navbar Component
 */
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, token } = useSelector((state) => state.auth);
  const shadow = location.pathname === "/" ? "" : "shadow-sm";

  let activeStyle = {
    textDecoration: "underline",
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails());
    }
  }, [token, dispatch]);

  return (
    <NavbarBS className={`bg-Dark ${shadow} mb-3 sticky-top`}>
      <Container fluid>
        <Nav className="me-auto">
          {/* <Button onClick={test}>testing</Button> */}
          <Nav.Link to="/" as={NavLink} className="text-light fw-bold fs-4">
            Home
          </Nav.Link>
          <Nav.Link
            to="/search/cuisine"
            as={NavLink}
            className="text-light fs-4"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Search
          </Nav.Link>
        </Nav>
        {currentUser ? (
          <Nav className="fs-4 me-2">
            <Nav.Link
              to="/user-profile"
              as={NavLink}
              className="text-light"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Profile
            </Nav.Link>
            <Nav.Link
              className="text-light bg-Dark"
              style={{ border: "none" }}
              as={Button}
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}>
              Log Out
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="fs-4 me-2">
            <Nav.Link
              to="/signUp"
              as={NavLink}
              className="text-light"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Sign Up
            </Nav.Link>
            <Nav.Link
              to="/login"
              as={NavLink}
              className="text-light"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Log In
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
