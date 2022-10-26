import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(pocess.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		})
		console.log(`MongoDB Connected: ${connect.connection.host}`)
	} catch (err) {
		console.error(`an error of : ${err.message}`);
		process.exit(1);
	}
}

export default connectDB;