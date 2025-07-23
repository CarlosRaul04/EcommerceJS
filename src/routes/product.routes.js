const express = require('express');
const controller = require('../controllers/product.controller');
const { verifyToken, isAdmin} = require('../middlewares/auth.middleware');

const router = express.Router();

// Rutas GET
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Ruta POST
router.post('/', verifyToken, isAdmin, controller.create);

// Ruta PUT
router.put('/:id', verifyToken, isAdmin, controller.update);

// Ruta DELETE
router.delete('/:id', verifyToken, isAdmin, controller.delete);

module.exports = router;