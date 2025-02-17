import express from 'express'
import { handleValidationErrors } from '../utils/index.js'
import {
	registerValidation,
	loginValidation,
} from '../components/validations.js'
import { AuthController } from '../controllers/index.js'

const router = express.Router()

router.post(
	'/signup',
	registerValidation,
	handleValidationErrors,
	AuthController.signup
)
router.post(
	'/login',
	loginValidation,
	handleValidationErrors,
	AuthController.login
)

export default router
