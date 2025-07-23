const Product = require('../models/Product');

const productService = {

    getAll: async() => {
        const products = await Product.find({});
        if(products.length === 0) throw new Error("No hay productos disponibles");
        return products;
    },

    getProductById: async(id) => {
        const product = await Product.findById(id);
        if(!product) throw new Error('No se encontró el producto');
        return product;
    },

    createProduct: async(name, description, price, stock, category, images = [], variants = [], reviews = []) => {
        const product = new Product({name, description, price, stock, category, images, variants, reviews});
        await product.save();
        return product;
    },

    updateProduct: async(id, data) => {
        const product = await Product.findByIdAndUpdate(id, data, { new: true });
        if(!product) throw new Error('Producto no encontrado');
        return {
            message: 'Producto actualizado',
            product: product
        };
    },

    deleteProduct: async(productId) => {
        const product = await Product.findByIdAndDelete(productId);
        if(!product) throw new Error('Producto no encontrado');
        return { message: 'Producto eliminado' };
    }

}

module.exports = productService;