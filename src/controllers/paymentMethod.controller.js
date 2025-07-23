const paymentMethodService = require('../services/paymentMethod.service');

exports.createPaymentMethod = async(req,res,next) => {
    try {
        const { name, description, isActive = true } = req.body;
        const method = await paymentMethodService.create(name, description, isActive);
        res.status(201).json(method); 
    } catch (err) {
        next(err)
    }
}

exports.updatePaymentMethod = async(req,res,next) => {
    try {
        const updatedMethod = await paymentMethodService.update(req.params.id, req.body);
        res.json(updatedMethod);
    } catch (err) {
        next(err)
    }
}

exports.deletePaymentMethod = async(req,res,next) => {
    try {
        const result = await paymentMethodService.delete(req.params.id);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.getAllPaymentMethods = async(req,res,next) => {
    try {
        const methods = await paymentMethodService.getAll();
        res.json(methods);
    } catch (err) {
        next(err)
    }
}

exports.getPaymentMethodById = async(req,res,next) => {
    try {
        const method = await paymentMethodService.getById(req.params.id);
        res.json(method);
    } catch (err) {
        next(err)
    }
}