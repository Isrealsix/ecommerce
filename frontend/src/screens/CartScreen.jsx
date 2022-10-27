import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import { Message } from '../components';

const CartScreen = () => {
	const { id: productId } = useParams();
	const location = useLocation();
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;
	useEffect(() => {
		if (productId) dispatch(addToCart(productId, qty));
	}, [dispatch, productId, qty])



	return <Row>
		<Col md={8}>
			<h1>Shopping Cart</h1>
			{cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
				<ListGroup variant='flush'></ListGroup>
			)}
		</Col>

		<Col md={2}></Col>
		<Col md={2}></Col>
	</Row>;
};

export default CartScreen;
