import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import {
	HomeScreen,
	ProductScreen,
	CartScreen,
	LoginScreen,
	RegisterScreen,
	ProfileScreen
} from './screens';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" exact element={<HomeScreen />} />
						<Route path="/product/:id" element={<ProductScreen />} />
						<Route path="/cart/" element={<CartScreen />} />
						<Route path="/cart/:id" element={<CartScreen />} />
						<Route path="/login" exact element={<LoginScreen />} />
						<Route path="/register" exact element={<RegisterScreen />} />
						<Route path="/profile" exact element={<ProfileScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
