import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
	const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();

	const submitHandler = ev => {
		ev.preventDefault();
		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
		} else {
			navigate('/');
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Comtrol
				type="text"
				name="q"
				onChange={ev => setKeyword(ev.target.value)}
				placeholder="Search Products..."
				className="mr-sm-2 ml-sm-5"
			></Form.Comtrol>
			<Button type="submit" variant="outline-success" className="p-2">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
