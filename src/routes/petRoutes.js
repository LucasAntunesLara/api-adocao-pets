const express = require('express');
const router = express.Router();

const PetController = require('../controllers/petController');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware');

//Públicas
router.get('/available', PetController.getAvailable);
//Admin
router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.getAll
);
router.get(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.getById
);
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.create
);
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.update
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.delete
);

module.exports = router;
