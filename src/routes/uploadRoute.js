import express from 'express'
import { UploadControllers } from '../controllers/index.js'

import { handleValidationErrors, checkAuth } from '../utils/index.js'

const router = express.Router()

router.post(
	'/massage',
	checkAuth,
	handleValidationErrors,
	UploadControllers.uploadMassageImg.single('massageImg'),
	UploadControllers.massageImgUpload
)
router.post(
	'/profile',
	checkAuth,
	handleValidationErrors,
	UploadControllers.uploadProfileImg.single('profile'),
	UploadControllers.profileImgUpload
)

export default router
