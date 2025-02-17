import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		text: String,
		image: {
			url: String,
			width: Number,
			height: Number,
		},
		roomId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Dialogue',
			ref: 'Group',
			required: true,
		},
		seen: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)
export default mongoose.model('Message', MessageSchema)
