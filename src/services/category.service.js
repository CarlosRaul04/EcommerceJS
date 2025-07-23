const Category = require('../models/Category');

const categoryService = {
    getAllCategories: async() => {
        const categories = await Category.find({});
        if(categories.length <= 0) throw new Error('No hay ninguna categoria');
        return categories;
    },

    getCategoryById: async(id) => {
        const category = await Category.findById(id);
        if(!category) throw new Error('No se encontró categoría');
        return category;
    },

    createCategory: async(name, description, parentCategory) => {
        const existing = await Category.findOne({ name });
        if(existing) throw new Error('Ya existe una categoría con ese nombre');

        const category = new Category({ name, description, parentCategory});
        await category.save();

        return {
            message: 'Categoría creada exitosamente',
            category
        };
    },

    updateCategory: async(id, nuevaData) => {
        const category = await Category.findByIdAndUpdate(id, nuevaData, { new: true });
        if(!category) throw new Error('Categoría no encontrada');
        return {
            message: 'Categoría actualizada exitosamente',
            category
        };
    },

    deleteCategory: async(id) => {
        const category = await Category.findByIdAndDelete(id);
        if(!category) throw new Error('Categoria no encontrada');
        return {
            message: 'Categoría eliminada exitosamente',
        };
    }
};

module.exports = categoryService;