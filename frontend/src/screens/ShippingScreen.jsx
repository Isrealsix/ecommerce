import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer } from '../components';

const ShippingScreen = () => {
	const [shippingAddress, setShippingAddress] = useState({
		address: '',
		city: '',
		postalCode: '',
		country: '',
	});

	const submitHandler = ev => {
		ev.preventDefault();
	};
	const onUpdateField = ev => {
		const key = ev.target.dataset.key;
		setShippingAddress(state => ({ ...state, [key]: ev.target.value }));
	};
	return (
		<FormContainer>
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						data-key="address"
						placeholder="Enter address"
						required
						value={shippingAddress.address}
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
						value={shippingAddress.city}
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
						value={shippingAddress.postalCode}
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
						value={shippingAddress.country}
						onChange={onUpdateField}
					></Form.Control>
				</Form.Group>

				<Button type='button' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
