const productService = require('../services/product.service');

exports.getAll = async(req, res, next) => {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

exports.getById = async(req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

exports.create = async(req,res,next) => {
    try {
        const { name, description, price, stock, category, images = [], variants = [], reviews = [] } =  req.body;
        const newProduct = await productService.createProduct(name, description, price, stock, category, images, variants, reviews);
        res.status(201).json(newProduct);
    } catch (err) {
        next(err)
    }
};

exports.update = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = await productService.updateProduct(id, data);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        res.json(product);
    } catch (err) {
        next(err);
    }
}