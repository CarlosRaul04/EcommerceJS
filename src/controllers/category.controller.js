const categoryService = require('../services/category.service');

exports.create = async(req, res, next) => {
    try {
        const { name, description, parentCategory } = req.body;
        const newCategory = await categoryService.createCategory(name, description, parentCategory);
        res.json(newCategory);
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (err) {
        next(err);
    }
}

exports.getById = async(req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.json(category);
    } catch (err) {
        next(err)
    }
}

exports.update = async(req, res, next) => {
    try {
        const id = req.params.id;
        const categoryUpdated = await categoryService.updateCategory(id, req.body);
        res.json(categoryUpdated);
    } catch (err) {
        next(err);
    }
};

exports.delete = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await categoryService.deleteCategory(id);
        res.json(result)
    } catch (err) {
        next(err)
    }
}