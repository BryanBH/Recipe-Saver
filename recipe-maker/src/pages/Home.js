import '../styles/home.css';
import React from 'react';
import { Col, Container, Row, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Carousel from '../components/globalComponents/carousel/Carousel';
import CarouselCard from '../components/globalComponents/carousel/CarouselCard';
import SpacingCopntainer from '../components/globalComponents/SpacingContainer';
import AboutHome from '../components/globalComponents/AboutHome';

import { randomData } from '../data/randomRecipes';
/**
 * Landing page
 */
const Home = () => {
	const recipes = randomData();
	return (
		<div>
			<div className="vector"></div>
			<Container className="text-light my-3">
				<Row className="d-flex justify-content-center text-center">
					<Col>
						<h1>RECIPE SAVER</h1>
						<Col>
							<p className="fs-4 hero-text">
								Search various types of recipes to cook at your next event or
								for your love ones!
							</p>
						</Col>
					</Col>
					<Col>
						<Col>
							<h2>Search By</h2>
						</Col>
						<Col className="d-flex justify-content-center align-items-center">
							<Nav.Link
								as={Link}
								to="/search/cuisine"
								className="btn btn-light text-Primary me-2 d-flex align-items-center justify-content-center"
								style={{ height: '42px', width: '112px' }}>
								Cuisine
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/search/type"
								className="btn btn-light text-Primary me-2 d-flex align-items-center justify-content-center"
								style={{ height: '42px', width: '112px' }}>
								Food Type
							</Nav.Link>{' '}
							<Nav.Link
								as={Link}
								to="/search/diet"
								className="btn btn-light text-Primary me-2 d-flex align-items-center justify-content-center"
								style={{ height: '42px', width: '112px' }}>
								Diet
							</Nav.Link>
						</Col>
					</Col>
				</Row>
			</Container>
			<Container className="my-5">
				<Row>
					<Col className="mt-3">
						<Carousel>
							{recipes.map((recipe, i) => {
								return <CarouselCard recipe={recipe} index={i} key={i} />;
							})}
						</Carousel>
					</Col>
				</Row>
			</Container>
			<SpacingCopntainer />
			<Container fluid className="mt-3 mb-5">
				<AboutHome />
			</Container>
		</div>
	);
};

export default Home;
