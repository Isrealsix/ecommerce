import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import colors from 'colors';
import {
	productRoutes,
	userRoutes,
	orderRoutes,
	uploadRoutes,
} from './routes/index.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
dotenv.config();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

connectDB();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
} else {
	app.get('/', (req, res) => {
		res.send('API online');
	});
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
	5000,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.rainbow
			.bold
	)
);
