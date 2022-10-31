import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer, CheckoutSteps } from '../components';
import { savePaymentMethod } from '../actions';

const PaymentScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		navigate('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const submitHandler = ev => {
		ev.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
				</Form.Group>
				<Col>
					<Form.Check
						type="radio"
						label="PayPal or Credit Card"
						id="PayPal"
						name="paymentMethod"
						value="PayPal"
						checked
						onChange={ev => setPaymentMethod(ev.target.value)}
					></Form.Check>

					<Form.Check
						type="radio"
						label="Stripe"
						id="Stripe"
						name="paymentMethod"
						value="Stripe"
						onChange={ev => setPaymentMethod(ev.target.value)}
					></Form.Check>
				</Col>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
