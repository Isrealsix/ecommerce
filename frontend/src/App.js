import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Header, Footer } from './components';
import { HomeScreen } from './screens';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" exact element={<HomeScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
