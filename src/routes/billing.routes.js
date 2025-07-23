const express = require('express');
const controller = require('../controllers/billing.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyToken);
router.post('/', controller.createBilling);
router.get('/', controller.getBilling);
router.put('/', controller.updateBilling);
router.delete('/', controller.deleteBilling);

module.exports = router;