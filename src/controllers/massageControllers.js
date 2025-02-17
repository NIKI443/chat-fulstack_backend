import sharp from 'sharp'
import MessageModel from '../modules/Message.js'
import { getReceiverSocketId, io } from '../utils/index.js'
import DialogueModel from '../modules/Dialogue.js'

export const sendMessage = async (req, res) => {
	try {
		const paramsId = req.params.id
		const userId = req.params.userId
		const imageWidth = req.body.width
		const imageHeight = req.body.height
		const receiverSocketId = getReceiverSocketId(userId)
		let dialog = await DialogueModel.findOne({
			users: { $all: [req.userId, userId] },
		})
		let message = await MessageModel.findOne({
			_id: paramsId,
		})
		if (message) {
			const messages = await MessageModel.find({
				roomId: message.roomId,
			})
			const lastMessage = messages[messages.length - 1]

			if (String(lastMessage._id) === String(message._id)) {
				await dialog.updateOne({
					lastMessage: {
						imgUrl: req.body.imgUrl,
						text: req.body.text || lastMessage.text,
						senderId: message.senderId,
						createdAt: message.createdAt,
					},
				})
			}
			const updateMessage = {
				senderId: req.userId,
				text: req.body.text,
				roomId: message.roomId,
				image: {
					url: req.body.imgUrl,
					width: imageWidth,
					height: imageHeight,
				},
			}

			message = await MessageModel.updateOne(
				{
					_id: paramsId,
				},
				updateMessage
			)
			if (receiverSocketId) {
				io.to(receiverSocketId).emit('editMessage', updateMessage, {
					messageId: paramsId,
				})
				if (String(lastMessage._id) === String(paramsId)) {
					io.to(receiverSocketId).emit('lastMessage', updateMessage)
				}
			}
			return res.json(message)
		}
		const newMessage = new MessageModel({
			senderId: req.userId,
			text: req.body.text,
			image: {
				url: req.body.imgUrl,
				width: imageWidth,
				height: imageHeight,
			},
			roomId: paramsId,
		})

		await Promise.all([
			newMessage.save(),
			dialog.updateOne({
				lastMessage: {
					imgUrl: req.body.imgUrl,
					text: req.body.text,
					senderId: req.userId,
					createdAt: new Date().toISOString(),
				},
			}),
		])

		if (receiverSocketId) {
			io.to(receiverSocketId).emit('newMessage', newMessage)
			io.to(receiverSocketId).emit('lastMessage', newMessage)
		}

		return res.json(newMessage)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не удалось написать сообщение',
		})
	}
}

export const getAllMessage = async (req, res) => {
	try {
		const roomId = req.params.id
		const doc = await MessageModel.find({ roomId }).sort({ createdAt: 1 })
		res.json(doc)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось найти сообщения',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const messageId = req.params.id
		const userId = req.params.userId

		const deletedMessage = await MessageModel.findOneAndDelete({
			_id: messageId,
		})
		const dialog = await DialogueModel.findOne({
			_id: deletedMessage.roomId,
		})
		const messages = await MessageModel.find({
			roomId: deletedMessage.roomId,
		})
		const lastMessage = messages[messages.length - 1]

		await dialog.updateOne({
			lastMessage: {
				image: req.body.imgUrl,
				text: lastMessage.text,
				senderId: lastMessage.senderId,
				createdAt: lastMessage.createdAt,
			},
		})
		const receiverSocketId = getReceiverSocketId(userId)

		io.to(receiverSocketId).emit('lastMessage', lastMessage)

		res.json({ success: true })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось удалить сообщение',
		})
	}
}
