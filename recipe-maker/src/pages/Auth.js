import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Register from "../components/globalComponents/Register";
import SignIn from "../components/globalComponents/SignIn";
/**
 * 
 * @param {string} authType Register || Signin 
 * @returns Auth page and its respective form 
 */
const Auth = ({ type }) => {
  const correctForm =
    type === "Register" ? <Register type={type} /> : <SignIn type={type} />;

  return (
    <Container fluid className="d-flex justify-content-center align-items-center my-3" style={{height:"100%"}}>
      <Row >
        <Col
          // xs={{ span: 6, offset: 3 }}
          style={{width: "100%"}}
          className="d-flex justify-content-center mb-3 mx-3 flex-column bg-darkAccent text-light rounded-5">
          {correctForm}
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
