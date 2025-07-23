const express = require('express');
const controller = require('../controllers/auth.controller');
const { verifyToken, isAdmin, canEditUser } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/refresh-token', controller.refreshToken);
router.post('/logout', controller.logout)

router.get('/my', verifyToken, controller.getMyProfile)
router.get('/', verifyToken, isAdmin, controller.getAll);
router.get('/:id', verifyToken, isAdmin, controller.getById);
router.put('/:id', verifyToken, canEditUser, controller.updateUser);

router.delete('/:id', verifyToken, canEditUser, controller.deleteUser);

module.exports = router;