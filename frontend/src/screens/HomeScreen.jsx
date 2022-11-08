import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Products, Message, Loader, Paginate } from '../components';
import { listProducts } from '../actions';

const HomeScreen = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const keyword = params.keyword;
	const pageNumber = params.pageNumber || 1;
	const productList = useSelector(state => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	console.log(params, 'of paramsss');

	return (
		<React.Fragment>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{products.map(product => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Products product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</React.Fragment>
	);
};

export default HomeScreen;
