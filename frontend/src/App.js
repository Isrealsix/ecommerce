import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import {
	HomeScreen,
	ProductScreen,
	CartScreen,
	LoginScreen,
	RegisterScreen,
	ProfileScreen,
	ShippingScreen,
	PaymentScreen,
	PlaceOrderScreen,
	OrderScreen,
	UserListScreen,
	UserEditScreen,
	ProductListScreen,
	ProductEditScreen,
	OrderListScreen,
} from './screens';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" exact element={<HomeScreen />} />
						<Route path="/login" exact element={<LoginScreen />} />
						<Route path="/register" exact element={<RegisterScreen />} />
						<Route path="/product/:id" element={<ProductScreen />} />
						<Route path="/cart/" element={<CartScreen />} />
						<Route path="/cart/:id" element={<CartScreen />} />
						<Route path="/profile" exact element={<ProfileScreen />} />
						<Route path="/shipping" exact element={<ShippingScreen />} />
						<Route path="/payment" exact element={<PaymentScreen />} />
						<Route path="/placeorder" exact element={<PlaceOrderScreen />} />
						<Route path="/order/:orderId" exact element={<OrderScreen />} />
						<Route path="/admin/userlist" exact element={<UserListScreen />} />
						<Route
							path="/admin/productlist"
							exact
							element={<ProductListScreen />}
						/>
						<Route
							path="/admin/orderlist"
							exact
							element={<OrderListScreen />}
						/>
						<Route
							path="/admin/product/:id/edit"
							exact
							element={<ProductEditScreen />}
						/>
						<Route
							path="/admin/user/:id/edit"
							exact
							element={<UserEditScreen />}
						/>

						<Route path="/search/:keyword" exact element={<HomeScreen />} />
						<Route
							path="/search/:keyword/page/:pageNumber"
							exact
							element={<HomeScreen />}
						/>
						<Route path="/page/:pageNumber" exact element={<HomeScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
