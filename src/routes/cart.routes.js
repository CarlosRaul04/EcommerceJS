const express = require('express');
const controller = require('../controllers/cart.controller');
const { isAdmin, verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(verifyToken);

// USER

// Crear Carrito
router.post('/', controller.createCart);

// Obtener carrito del usuario actual
router.get('/my-cart', controller.getCartByUser);

// Agregar o actualizar un item en el carrito
router.post('/item', controller.addOrUpdateItem);

// Actualizar la cantidad de un item
router.patch('/item', controller.updateItemQuantity);

// Eliminar un item del carrito
router.delete('/item', controller.removeItem);

// Vaciar el carrito
router.delete('/clear', controller.cleanCart);


// ADMIN

// Eliminar completamente el carrito
router.delete('/:userId', isAdmin, controller.deleteCart);

// Obtener todos los carritos
router.get('/', isAdmin, controller.getAllCarts);

// Contar todos los carritos
router.get('/count', isAdmin, controller.countCarts);

// Quitar un producto de todos los carritos
router.delete('/product/:productId', isAdmin, controller.removeProductFromAllCarts);

module.exports = router;