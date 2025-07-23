const express = require('express');
const controller = require('../controllers/order.controller');
const { isAdmin, verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();


// Rutas protegidas para usuarios autenticados
router.post('/', verifyToken, controller.createOrder); // Crear Orden
router.get('/my', verifyToken, controller.getUserOrders); // Obtener órdenes del usuario
router.get('/my/:id', verifyToken, controller.getOrderById); // Obtener una order del usuario
router.put('/cancel/:id', verifyToken, controller.cancelOrderByUser); // Cancelar orden por usuario

// Rutas solo para administradores
router.get('/', verifyToken, isAdmin, controller.getAllOrders); // Obtener todas las ordenes
router.put('/status/:id', verifyToken, isAdmin, controller.updateOrderStatus); // Cambiar estado de la orden
router.put('/paid/:id', verifyToken, isAdmin, controller.markAsPaid); // Marcar como pagado una orden
router.delete('/:id', verifyToken, isAdmin, controller.deleteOrder); // Eliminar orden
router.put('/cancel/admin/:id', verifyToken, isAdmin, controller.cancelOrderByAdmin); // Cancelar orden por admin

module.exports = router;