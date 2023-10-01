import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const AboutHome = () => {
  return (
    <Container className="text-center text-light bg-darkAccent rounded-5 shadow-sm" style={{maxWidth:"700px"}}>
      <Row>
        <Col>
          <p className="p-3 mt-3 fs-5">
           Ever wanted to try new recipes? let it be for yourself, for friends & family, or to challenge your cooking skills! Sign up and save your favorite recipes for future cooking/baking.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutHome;
