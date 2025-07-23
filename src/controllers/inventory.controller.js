const inventoryService = require('../services/inventory.service');

exports.createSupply = async( req, res, next ) => {
    try {
        const result = await inventoryService.createSupply(req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}

exports.getAllSupplies = async( req, res, next) => {
    try {
        const result = await inventoryService.getAllSupplies();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

exports.getSupplyById = async( req, res, next ) => {
    try {
        const result = await inventoryService.getSupplyById(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

exports.updateSupply = async( req, res, next ) => {
    try {
        const supplyId = req.params.id;
        const result = await inventoryService.updateSupply(supplyId, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

exports.deleteSupply = async( req, res, next) => {
    try {
        const supplyId = req.params.id;
        const result = await inventoryService.deleteSupply(supplyId);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

exports.recordMovement = async( req, res, next) => {
    try {
        const userId = req.user.id;
        
        const result = await inventoryService.recordMovement({ 
            supplyId: req.body.supplyId,
            type: req.body.type,
            quantity: req.body.quantity,
            note: req.body.note,
            userId: userId
        });
        
        res.json(result);
    } catch (err) {
        next(err);
    }
}

exports.getMovementsByUser = async( req, res, next ) => {
    try {
        const userId = req.params.userId;
        const result = await inventoryService.getMovementsByUser(userId);
        res.json(result);
    } catch (err) {
        next(err)
    }
}

exports.getMyMovements = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await inventoryService.getMyMovements(userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

