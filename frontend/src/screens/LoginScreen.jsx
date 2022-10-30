import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader, FormContainer } from '../components';
import { login } from '../actions';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const location = useLocation();
	const dispatch = useDispatch();
	const userLogin = useSelector(state => state.userLogin);
	const navigate = useNavigate();
	const { loading, error, userInfo } = userLogin;
	const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';

	useEffect(() => {
		console.log(redirect, 'of redirect')
		if (userInfo) navigate(redirect)
	}, [navigate, redirect, userInfo]);


	const submitHandler = ev => {
		ev.preventDefault();
		dispatch(login(email, password))
	}
	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					Sign In
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
