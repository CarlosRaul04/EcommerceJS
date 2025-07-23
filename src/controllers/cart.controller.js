const cartService = require('../services/cart.service');


exports.createCart = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await cartService.createCart(userId);
        res.status(201).json(result);
    } catch (err) {
        next(err)
    }
}

exports.getCartByUser = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await cartService.getCartByUser(userId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.addOrUpdateItem = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await cartService.addOrUpdateItem(userId, req.body);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.removeItem = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const {productId, variant} = req.body;
        const result = await cartService.removeItem(userId, productId, variant);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.updateItemQuantity = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity, variant } = req.body
        const result = await cartService.updateItemQuantity(userId, productId, quantity, variant);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.cleanCart = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await cartService.cleanCart(userId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.deleteCart = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await cartService.deleteCart(userId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.getAllCarts = async(req, res, next) => {
    try {
        const result = await cartService.getAllCarts();
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.countCarts = async(req, res, next) => {
    try {
        const result = await cartService.countCarts();
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.removeProductFromAllCarts = async(req, res, next) => {
    try {
        const productId = req.params.productId;
        const result = await cartService.removeProductFromAllCarts(productId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}