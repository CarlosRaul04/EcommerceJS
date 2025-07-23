const orderService = require('../services/order.service');

exports.createOrder = async(req, res, next) => {
    try {
        const userId = req.user.id
        const order = await orderService.createOrder(userId, req.body);
        res.status(201).json(order);
    } catch (err) {
        next(err)
    }
}

exports.getUserOrders = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await orderService.getOrdersByUser(userId);
        res.json(orders);
    } catch (err) {
        next(err)
    }
}

exports.getOrderById = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId, userId);
        res.json(order); 
    } catch (err) {
        next(err)
    }
}

exports.getAllOrders = async(req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const result = await orderService.getAllOrders(page, limit);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.updateOrderStatus = async(req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const result = await orderService.updateOrderStatus(orderId, status);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.markAsPaid = async(req, res, next) => {
    try {
        const orderId = req.params.id;
        const result = await orderService.markAsPaid(orderId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.deleteOrder = async(req, res, next) => {
    try {
        const orderId = req.params.id;
        const result = await orderService.deleteOrder(orderId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.cancelOrderByUser = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const result = await orderService.cancelOrderByUser(orderId, userId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.cancelOrderByAdmin = async(req, res, next) => {
    try {
        const orderId = req.params.id;
        const result = await orderService.cancelOrderByAdmin(orderId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}