import express from 'express'
import { handleValidationErrors, checkAuth } from '../utils/index.js'

import { MassageControllers } from '../controllers/index.js'

const router = express.Router()

router.post(
	'/:id/:userId',
	checkAuth,
	handleValidationErrors,
	MassageControllers.sendMessage
)

router.get(
	'/:id',
	checkAuth,
	handleValidationErrors,
	MassageControllers.getAllMessage
)

router.delete(
	'/:id/:userId',
	checkAuth,
	handleValidationErrors,
	MassageControllers.remove
)
export default router
