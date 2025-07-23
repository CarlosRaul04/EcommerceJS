const express = require('express');
const controller = require('../controllers/search.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(verifyToken);

router.post('/', controller.saveSearch);

router.get('/', controller.getUserSearches);

router.delete('/', controller.deleteUserSearches);

module.exports = router;