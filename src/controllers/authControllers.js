import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../modules/User.js'

export const signup = async (req, res) => {
	try {
		const body = req.body
		const password = body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		const IsEmail = await UserModel.findOne({ email: body.email })
		const IsUserID = await UserModel.findOne({ UserID: body.UserID })
		if (IsEmail || IsUserID)
			return res.status(400).json({ message: 'Email или ID уже используются' })

		const doc = new UserModel({
			email: body.email,
			name: body.name,
			surname: body.surname,
			passwordHash: hash,
			UserID: body.UserID,
		})
		const user = await doc.save()

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		const { passwordHash, ...userData } = user._doc
		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось зарегистрироваться',
		})
	}
}

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })
		if (!user) {
			return res.status(404).json({
				message: 'Неверный логин или пароль',
			})
		}
		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		)

		if (!isValidPass) {
			return res.status(404).json({
				message: 'Неверный логин или пароль',
			})
		}
		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		const { passwordHash, ...userData } = user._doc
		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось авторизоваться',
		})
	}
}
