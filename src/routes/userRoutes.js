const express = require('express')

const UserController = require('../controllers/userController')

const router = express.Router()

router.post('/register', UserController.create)

module.exports = router
