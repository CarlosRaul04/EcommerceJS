const express = require('express');
const controller = require('../controllers/paymentMethod.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Rutas
router.post('/', verifyToken, isAdmin, controller.createPaymentMethod);
router.get('/', controller.getAllPaymentMethods);
router.get('/:id', verifyToken, isAdmin, controller.getPaymentMethodById);
router.put('/:id', verifyToken, isAdmin, controller.updatePaymentMethod);
router.delete('/:id', verifyToken, isAdmin, controller.deletePaymentMethod);

module.exports = router;