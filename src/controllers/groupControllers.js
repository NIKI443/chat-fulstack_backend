import GroupModel from '../modules/Group.js'
import UserModel from '../modules/User.js'

export const create = async (req, res) => {
	try {
		const user = req.userId
		const friends = []
		for (let i = 0; i < req.body.UserID.length; i++) {
			let friend = await UserModel.findOne({
				UserID: req.body.UserID[i],
			})
			if (!friend) {
				return res.status(404).json({
					massage: 'Неверный ID друга',
				})
			}

			friends.push(friend._id)
		}
		const users = [user, ...friends]
		let doc = new GroupModel({
			users: users,
			title: req.body.title,
		})

		const Dialogueroom = await doc.save()
		res.json(Dialogueroom)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не удалось создать группу',
		})
	}
}

export const update = async (req, res) => {
	try {
		const dialogId = req.params.id
		const user = req.userId
		const friends = []
		for (let i = 0; i < req.body.UserID.length; i++) {
			let friend = await UserModel.findOne({
				UserID: req.body.UserID[i],
			})
			if (!friend) {
				return res.status(404).json({
					massage: 'Неверный ID друга',
				})
			}

			friends.push(friend._id)
		}
		const users = [user, ...friends]

		await GroupModel.updateOne(
			{
				_id: dialogId,
			},
			{
				title: req.body.title,
				users: users,
			}
		)
		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не удалось изменить группу',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const dialogId = req.params.id
		const doc = await GroupModel.findOne({
			_id: dialogId,
		})

		res.json(doc)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не удалось найти группу',
		})
	}
}

export const getAll = async (req, res) => {
	try {
		const doc = await GroupModel.find().populate('user').exec()

		res.json(doc)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не удалось найти группу',
		})
	}
}
export const remove = async (req, res) => {
	try {
		const dialogId = req.params.id

		GroupModel.findOneAndDelete(
			{
				_id: dialogId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось удалить группа',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Группа не найдена',
					})
				}

				res.json({
					success: true,
				})
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не удалось найти группа',
		})
	}
}
