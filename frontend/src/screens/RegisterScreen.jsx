import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader, FormContainer } from '../components';
import { register } from '../actions';

const RegisterScreen = () => {
	const [field, setField] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		message: ''
	});

	const location = useLocation();
	const dispatch = useDispatch();
	const userRegister = useSelector(state => state.userRegister);
	const navigate = useNavigate();
	const { loading, error, userInfo } = userRegister;
	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) navigate(redirect);
	}, [navigate, redirect, userInfo]);

	const submitHandler = ev => {
		ev.preventDefault();
		if (field.password !== field.confirmPassword) {
			setField(state => ({ ...state, message: 'Passwords do not match' }))
		} else {
			dispatch(register(field.name, field.email, field.password))
		}
	};

	const onUpdateField = ev => {
		const key = ev.target.dataset.key;
		setField(state => ({ ...state, [key]: ev.target.value }));
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
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
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Have an Account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
