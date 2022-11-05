import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader, FormContainer } from '../components';
import { listProductDetails } from '../actions';

const ProductEditScreen = () => {
	const [field, setField] = useState({
		name: '',
		price: 0,
		image: '',
		brand: '',
		category: '',
		countInStock: 0,
		description: '',
	});

	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const productId = params.id;
	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		if (!product?.name || product?._id !== productId) {
			dispatch(listProductDetails(productId));
		} else {
			setField(prev => ({
				name: product.name,
				price: product.price,
				image: product.image,
				brand: product.brand,
				category: product.category,
				countInStock: product.countInStock,
				description: product.description,
			}));
		}
	}, [dispatch, productId, product, navigate]);

	const submitHandler = ev => {
		ev.preventDefault();
	};

	const onUpdateField = ev => {
		const key = ev.target.dataset.key;
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
		setField(state => ({ ...state, [key]: value }));
	};

	return (
		<>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
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

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								data-key="price"
								placeholder="Enter price"
								value={field.price}
								onChange={onUpdateField}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								data-key="image"
								placeholder="Enter image URL"
								value={field.image}
								onChange={onUpdateField}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								data-key="brand"
								placeholder="Enter brand"
								value={field.brand}
								onChange={onUpdateField}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="countInStock">
							<Form.Label>count In Stock</Form.Label>
							<Form.Control
								type="number"
								data-key="countInStock"
								placeholder="Enter count in stock"
								value={field.countInStock}
								onChange={onUpdateField}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								data-key="category"
								placeholder="Enter category"
								value={field.category}
								onChange={onUpdateField}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								data-key="description"
								placeholder="Enter description"
								value={field.description ?? ''}
								onChange={onUpdateField}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
