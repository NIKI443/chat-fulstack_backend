import express from 'express'
import { handleValidationErrors, checkAuth } from '../utils/index.js'

import { DialogueControllers } from '../controllers/index.js'

const router = express.Router()

router.post('/', checkAuth, handleValidationErrors, DialogueControllers.create)
router.get('/', checkAuth, handleValidationErrors, DialogueControllers.getAll)
router.get(
	'/:id',
	checkAuth,
	handleValidationErrors,
	DialogueControllers.getOne
)
router.delete(
	'/:id',
	checkAuth,
	handleValidationErrors,
	DialogueControllers.remove
)

export default router
