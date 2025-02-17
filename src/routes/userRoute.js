import express from 'express'
import { handleValidationErrors, checkAuth } from '../utils/index.js'
import { UserController } from '../controllers/index.js'

const router = express.Router()

router.get('/:id', checkAuth, handleValidationErrors, UserController.getOne)
router.get('/', checkAuth, handleValidationErrors, UserController.getMe)

router.patch(
	'/update',
	checkAuth,
	handleValidationErrors,
	UserController.updateMe
)

export default router
