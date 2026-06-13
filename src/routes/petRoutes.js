const express = require('express')
const router = express.Router()

const PetController = require('../controllers/petController')
const {authenticateToken} = require('../middlewares/authMiddleware')

//Públicas
router.get('/available', PetController.getAvailable)
//Admin
router.get('/', authenticateToken, PetController.getAll)
router.get('/:id', authenticateToken, PetController.getById)
router.post('/', authenticateToken, PetController.create)
router.put('/:id', authenticateToken, PetController.update)
router.delete('/:id', authenticateToken, PetController.delete)

module.exports = router
