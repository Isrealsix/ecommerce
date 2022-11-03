import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader } from '../components';
import { getUserDetails, updateUserProfile, listMyOrders } from '../actions';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = () => {
	const [field, setField] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		message: '',
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userDetails = useSelector(state => state.userDetails);
	const userLogin = useSelector(state => state.userLogin);
	const { loading, error, user } = userDetails;
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector(state => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderListMy = useSelector(state => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	useEffect(() => {
		if (!userInfo) navigate('/login');
		else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
				dispatch(listMyOrders());
			} else
				setField(state => ({ ...state, name: user.name, email: user.email }));
		}
	}, [navigate, userInfo, dispatch, user]);

	const submitHandler = ev => {
		ev.preventDefault();
		if (field.password !== field.confirmPassword) {
			setField(state => ({ ...state, message: 'Passwords do not match' }));
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					name: field.name,
					email: field.email,
					password: field.password,
				})
			);
		}
	};

	const onUpdateField = ev => {
		const key = ev.target.dataset.key;
		setField(state => ({ ...state, [key]: ev.target.value }));
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{field.message && <Message variant="danger">{field.message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Updated!</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							data-key="name"
							placeholder="Enter name"
							value={field.name}
							onChange={onUpdateField}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							data-key="email"
							placeholder="Enter email"
							value={field.email}
							onChange={onUpdateField}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							data-key="password"
							placeholder="Enter password"
							value={field.password}
							onChange={onUpdateField}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							data-key="confirmPassword"
							placeholder="Confirm password"
							value={field.confirmPassword}
							onChange={onUpdateField}
						></Form.Control>
					</Form.Group>
					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className='btn-sm' variant="light">Details</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
