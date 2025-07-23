const billingService = require('../services/billing.service');

exports.createBilling = async(req, res, next) => {
    try {
        const billingData = {...req.body, userId: req.user.id}; // sacamos el id del user del TOKEN DE JWT
        const billing = await billingService.createBilling(billingData);
        res.status(201).json(billing);
    } catch (err) {
        next(err)
    };
};

exports.getBilling = async(req, res, next) => {
    try {
        const billing = await billingService.getBillingByUserId(req.user.id);
        res.json(billing);
    } catch (err) {
        next(err)
    }
};

exports.updateBilling = async(req, res, next) => {
    try {
        const updatedBilling = await billingService.updateBilling(req.user.id, req.body);
        res.json(updatedBilling);
    } catch (err) {
        next(err);
    }
};

exports.deleteBilling= async(req, res, next) => {
    try {
        const result = await billingService.deleteBilling(req.user.id);
        res.json(result);
    } catch (err) {
        next(err)
    }
}