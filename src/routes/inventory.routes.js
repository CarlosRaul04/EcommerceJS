const express = require('express');
const controller = require('../controllers/inventory.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router(); 

// Aplicamos los middleware
router.use(verifyToken, isAdmin);

// Métodos de crear insumo y crear movimiento
router.post('/', controller.createSupply);
router.post('/movement', controller.recordMovement);

// Métodos para obtener todos los insumos e insumo por id
// Métodos para obtener todos los movimientos hechos por el usuario autenticado y tambien por el usuario bucado;
router.get('/', controller.getAllSupplies);
router.get('/:id', controller.getSupplyById);
router.get('/movement/my', controller.getMyMovements);
router.get('/movement/:userId', controller.getMovementsByUser);

// Método para actualizar un insumo
router.put('/:id', controller.updateSupply);

// Método para realizar un movimiento de un insumo (Entrada, Salida, Ajuste)
router.delete('/:id', controller.deleteSupply);

module.exports = router;

