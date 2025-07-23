const express = require('express');
const controller = require('../controllers/category.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Rutas protegidas con el Middleware
router.post('/', verifyToken, isAdmin, controller.create);
router.put('/:id', verifyToken, isAdmin, controller.update);
router.delete('/:id', verifyToken, isAdmin, controller.delete);

module.exports = router;