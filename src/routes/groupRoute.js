import express from 'express'
import { handleValidationErrors, checkAuth } from '../utils/index.js'
import { GroupControllers } from '../controllers/index.js'

const router = express.Router()

router.post('/', checkAuth, handleValidationErrors, GroupControllers.create)
router.post('/:id', checkAuth, handleValidationErrors, GroupControllers.update)
router.get('/:id', checkAuth, handleValidationErrors, GroupControllers.getOne)
router.get('/', checkAuth, handleValidationErrors, GroupControllers.getAll)
router.delete(
	'/:id',
	checkAuth,
	handleValidationErrors,
	GroupControllers.remove
)
export default router
