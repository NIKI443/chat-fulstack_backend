import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { UserController } from './controllers/index.js'
import {
	authRoute,
	userRoute,
	groupRoute,
	dialogueRoute,
	massageRoute,
	uploadRoute,
} from './routes/index.js'
import {
	handleValidationErrors,
	checkAuth,
	DB,
	app,
	server,
} from './utils/index.js'

dotenv.config()

app.use(express.json())
app.use('/uploads/images/profile', express.static('src/uploads/images/profile'))
app.use('/uploads/images/massage', express.static('src/uploads/images/massage'))
app.use(
	cors({
		origin: process.env.CORS_ORIGIN_SITE || 'http://localhost:5173',
		credentials: true,
	})
)
console.log(process.env.CORS_ORIGIN_SITE || 'http://localhost:5173')
console.log(process.env.CORS_ORIGIN_SITE)

app.use('/upload', uploadRoute)
app.get('/users', checkAuth, handleValidationErrors, UserController.getAllUsers)
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/group', groupRoute)
app.use('/dialogue', dialogueRoute)
app.use('/massage', massageRoute)

server.listen(process.env.PORT || 4444, err => {
	if (err) {
		return console.log(err)
	}
	console.log('Server Ok')
	DB.connectDB()
})
