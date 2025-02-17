import mongoose from 'mongoose'

const DialogueSchema = new mongoose.Schema({
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
	lastMessage: {
		isFirst: {
			type: Boolean,
			default: false,
		},
		text: String,
		imgUrl: String,
		senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		seen: {
			type: Boolean,
			default: false,
		},
		createdAt: String,
		updatedAt: String,
	},
})
export default mongoose.model('Dialogue', DialogueSchema)
