import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer, CheckoutSteps } from '../components';
import { saveShippingAddress } from '../actions';

const ShippingScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	const [shippingAddressInfo, setShippingAddressInfo] = useState({
		address: shippingAddress.address ?? '',
		city: shippingAddress.city ?? '',
		postalCode: shippingAddress.postalCode ?? '',
		country: shippingAddress.country ?? '',
	});

	const submitHandler = ev => {
		ev.preventDefault();
		dispatch(saveShippingAddress({ ...shippingAddressInfo }));
		navigate('/payment');
	};

	const onUpdateField = ev => {
		const key = ev.target.dataset.key;
		setShippingAddressInfo(state => ({ ...state, [key]: ev.target.value }));
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						data-key="address"
						placeholder="Enter address"
						required
						value={shippingAddressInfo.address}
						onChange={onUpdateField}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						data-key="city"
						placeholder="Enter city"
						required
						value={shippingAddressInfo.city}
						onChange={onUpdateField}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						data-key="postalCode"
						placeholder="Enter postal code"
						required
						value={shippingAddressInfo.postalCode}
						onChange={onUpdateField}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						data-key="country"
						placeholder="Enter country"
						required
						value={shippingAddressInfo.country}
						onChange={onUpdateField}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
