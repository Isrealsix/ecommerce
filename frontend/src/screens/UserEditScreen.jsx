import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader, FormContainer } from '../components';
import { getUserDetails, updateUser } from '../actions';
import { USER_UPDATE_RESET } from '../constants';

const UserEditScreen = () => {
	const [field, setField] = useState({
		name: '',
		email: '',
		isAdmin: false,
	});

	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const userId = params.id;
	const userDetails = useSelector(state => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector(state => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			navigate('/admin/userlist');
		} else {
			if (!user?.name || user?._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setField(prev => ({
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
				}));
			}
		}
	}, [dispatch, userId, user, successUpdate, navigate]);

	const submitHandler = ev => {
		ev.preventDefault();
		dispatch(updateUser({ ...field, _id: userId }));
	};

	const onUpdateField = ev => {
		const key = ev.target.dataset.key;
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
		setField(state => ({ ...state, [key]: value }));
	};

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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

						<Form.Group controlId="isadmin">
							<Form.Check
								type="checkbox"
								data-key="isAdmin"
								label="Is Admin"
								checked={field.isAdmin}
								onChange={onUpdateField}
							></Form.Check>
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

export default UserEditScreen;
