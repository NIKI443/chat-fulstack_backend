import DialogueModel from '../modules/Dialogue.js'
import UserModel from '../modules/User.js'

export const create = async (req, res) => {
	try {
		const friend = await UserModel.findOne({
			UserID: req.body.UserID,
		})

		const dialog = await DialogueModel.findOne({
			users: { $all: [req.userId, friend._id] },
		})
		if (dialog) {
			return res.status(404).json({ message: 'Диалог уже существует' })
		}

		if (!friend) {
			return res.status(404).json({
				message: 'Неверный ID Пользователя',
			})
		}
		let doc = new DialogueModel({
			users: [req.userId, friend._id],
			lastMessage: {
				isFirst: true,
				text: 'Нет сообщений',
				senderId: req.userId,
				createdAt: new Date().toISOString(),
			},
		})
		const Dialogue = await doc.save()

		res.json(Dialogue)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать диалог',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const dialogId = req.params.id
		const doc = await DialogueModel.findOne({
			_id: dialogId,
		})
		if (!doc) {
			return res.status(404).json({
				message: 'Не удалось найти диалог',
			})
		}
		res.json(doc)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось найти диалог',
		})
	}
}
export const getAll = async (req, res) => {
	try {
		const doc = await DialogueModel.find({
			users: req.userId,
		})

		res.json(doc)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось найти диалог',
		})
	}
}
export const remove = async (req, res) => {
	try {
		const dialogId = req.params.id
		await DialogueModel.findOneAndDelete({ _id: dialogId })
		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось найти диалог для удаления',
		})
	}
}
