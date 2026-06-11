const express = require('express')
const router = express.Router()

const PetController = require('../controllers/petController')

//Públicas
router.get('/available', PetController.getAvailable)
//Admin
router.get('/', PetController.getAll)
router.get('/:id', PetController.getById)
router.post('/', PetController.create)
router.put('/:id', PetController.update)
router.delete('/:id', PetController.delete)
