import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../modules/User.js'

export const updateMe = async (req, res) => {
	try {
		const body = req.body
		const user = await UserModel.findById({
			_id: req.userId,
		})
		let hash
		if (body.password) {
			const salt = await bcrypt.genSalt(10)
			hash = await bcrypt.hash(body.password, salt)
		}
		if (!user) {
			return res.status(404).json({
				message: 'Не удалось найти пользователя',
			})
		}
		await UserModel.updateOne(
			{
				_id: req.userId,
			},
			{
				email: body.email,
				name: body.name,
				surname: body.surname,
				passwordHash: hash,
				UserID: body.UserID,
				avatarUrl: body.avatarUrl,
			}
		)
		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		const userNow = await UserModel.findById({
			_id: req.userId,
		})

		const { passwordHash, ...userData } = userNow._doc

		res.json({
			userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось изменить данные пользователя',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const userId = req.params.id
		const doc = await UserModel.findOne({
			_id: userId,
		})

		if (!doc) {
			return res.status(404).json({
				message: 'Не удалось найти пользователя',
			})
		}
		res.json(doc)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось найти пользователя',
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const doc = await UserModel.findById({
			_id: req.userId,
		})
		if (!doc) {
			return res.status(404).json({
				message: 'Не удалось найти пользователя',
			})
		}
		const { passwordHash, ...userData } = doc._doc
		res.json(userData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось найти пользователя',
		})
	}
}

export const getAllUsers = async (req, res) => {
	try {
		const myID = await UserModel.findById({
			_id: req.userId,
		})
		const doc = await UserModel.find().exec()
		if (!doc) {
			return res.status(404).json({
				message: 'Не удалось найти пользователей',
			})
		}
		const docFilter = doc.filter(
			user => user._id.toString() !== myID._id.toString()
		)
		res.json(docFilter)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось найти пользователей',
		})
	}
}

