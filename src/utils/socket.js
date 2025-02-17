import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import DialogueModel from '../modules/Dialogue.js'
import MessageModel from '../modules/Message.js'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:5173'],
	},
})

export function getReceiverSocketId(userId) {
	return userSocketMap[userId]
}

const userSocketMap = {}

io.on('connection', socket => {
	const userId = socket.handshake.query.userId
	if (userId) userSocketMap[userId] = socket.id

	io.emit('getOnlineUsers', Object.keys(userSocketMap))

	socket.on('markMessagesAsSeen', async ({ roomId, UserId }) => {
		try {
			await MessageModel.updateMany(
				{ roomId: roomId, seen: false },
				{ $set: { seen: true } }
			)

			await DialogueModel.updateOne(
				{ _id: roomId },
				{ $set: { 'lastMessage.seen': true } }
			)
			io.to(userSocketMap[UserId]).emit('messagesSeen', { roomId })
		} catch (error) {
			console.log(error)
		}
	})

	socket.on('disconnect', () => {
		delete userSocketMap[userId]
		io.emit('getOnlineUsers', Object.keys(userSocketMap))
	})
})

export { io, app, server }
