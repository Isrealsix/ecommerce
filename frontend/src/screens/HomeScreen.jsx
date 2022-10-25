import React from 'react';
import products from '../products';
import { Row, Col } from 'react-bootstrap';
import { Products } from '../components';

const HomeScreen = () => {
	return (
		<React.Fragment>
			<h1>Latest Products</h1>
			<Row>
				{products.map(product => (
					<Col key={product._id}  sm={12} md={6} lg={4} xl={3}>
						<Products product={product} />
					</Col>
				))}
			</Row>
		</React.Fragment>
	);
};

export default HomeScreen;
