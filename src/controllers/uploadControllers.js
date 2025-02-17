import multer from 'multer'

const storageMassageImgConfig = multer.diskStorage({
	destination: function (_, __, cb) {
		cb(null, 'src/uploads/images/massage')
	},
	filename: function (_, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})
const storageProfileImgConfig = multer.diskStorage({
	destination: function (_, __, cb) {
		cb(null, 'src/uploads/images/profile')
	},
	filename: function (_, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})

export const uploadMassageImg = multer({ storage: storageMassageImgConfig })

export const uploadProfileImg = multer({ storage: storageProfileImgConfig })

export const massageImgUpload = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).send('Ошибка при загрузке файла')
		}
		res.json({
			url: `uploads/images/massage/${req.file.filename}`,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не удалось загрузить картинку',
		})
	}
}

export const profileImgUpload = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).send('Ошибка при загрузке файла')
		}
		res.json({ url: `uploads/images/profile/${req.file.filename}` })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не удалось загрузить картинку',
		})
	}
}
