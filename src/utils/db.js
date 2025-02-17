import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGODB_URI)
		console.log('DB OK')
	} catch (error) {
		console.log('DB error', error)
	}
}
