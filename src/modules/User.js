import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		surname: String,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'User',
			required: true,
		},
		UserID: {
			type: String,
			required: true,
			unique: true,
		},
		avatarUrl: String,
	},
	{
		timestamps: true,
	}
)
export default mongoose.model('User', UserSchema)
