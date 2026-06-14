const express = require('express')
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware')
const UserController = require('../controllers/userController')

const router = express.Router()

router.post('/', UserController.create)
router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  UserController.findAll,
)
router.get('/:id', authenticateToken, UserController.findById)
router.put('/:id', authenticateToken, UserController.update)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  UserController.delete,
)

module.exports = router
