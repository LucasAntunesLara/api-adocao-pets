const express = require('express')
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware')
const AdoptionController = require('../controllers/adoptionController')

const router = express.Router()

router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  AdoptionController.getAll,
)
router.post(
  '/',
  authenticateToken,
  authorizeRole('adopter'),
  AdoptionController.create,
)

module.exports = router
