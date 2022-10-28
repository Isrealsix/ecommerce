import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());

dotenv.config();
connectDB();

app.get('/', (req, res) => {
	res.send('API online')
})

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.rainbow.bold));