import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader } from '../components';
import { getUserDetails } from '../actions';

const ProfileScreen = () => {
	const [field, setField] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		message: '',
	});

	const dispatch = useDispatch();
	const userDetails = useSelector(state => state.userDetails);
	const userLogin = useSelector(state => state.userLogin);
	const navigate = useNavigate();
	const { loading, error, user } = userDetails;
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) navigate('/login');
		else {
			if (!user.name) dispatch(getUserDetails('profile'));
			else
				setField(state => ({ ...state, name: state.name, email: state.email }));
		}
	}, [navigate, userInfo, dispatch, user.name]);

	const submitHandler = ev => {
		ev.preventDefault();
		if (field.password !== field.confirmPassword) {
			setField(state => ({ ...state, message: 'Passwords do not match' }));
		} else {
			// DISPATCH update handler
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
			</Col>
		</Row>
	);
};

export default ProfileScreen;
