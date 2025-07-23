const AppError = require('../utils/AppError');
const PurchaseCart = require('../models/PurchaseCart');
const Product = require('../models/Product');

const cartService = {
    createCart: async (userId) => {
        const existing = await PurchaseCart.findOne({userId});
        if(existing) throw new AppError('El usuario ya tiene un carrito', 400);

        const cart = new PurchaseCart({ userId, items: [] });
        await cart.save();
        return {
            message: 'Carrito creado correctamente',
            data: cart
        };    
    },

    getCartByUser: async (userId) => {
        const cart = await PurchaseCart.findOne({userId}).populate('items.productId');
        if(!cart) throw new AppError('Carrito no encontrado', 404);
        return cart;
    },

    addOrUpdateItem: async (userId, { productId, quantity, variant }) => {
        const product = await Product.findById(productId);
        if(!product) throw new AppError('Producto no encontrado', 404);

        const cart = await PurchaseCart.findOne({ userId });
        if(!cart) {
            cart = new PurchaseCart({ userId, Items: [] });
        }

        // Buscamos el precio segun la variante seleccionada
        let selectedPrice = product.price;

        if(variant && product.variants && Array.isArray(product.variants)){
            const variantData = product.variants.find( v => v.name === variant);
            if(variantData && variantData.price){
                selectedPrice = variantData.price;
            }
        }

        // Verificamos si ya existe ese producto + variante en el carrito
        const existingItem = cart.items.find(item => 
            item.productId.equals(productId) && item.variant === variant
        );

        if(existingItem) {
            existingItem.quantity += quantity
            existingItem.price = selectedPrice; // Actualizamos el precio por si ha cambiado
        } else {
            cart.items.push({
                productId,
                name: product.name,
                price: selectedPrice,
                quantity,
                variant
            });
        }

        await cart.save();
        return {
            message: 'Producto agregado/actualizado en el carrito',
            data: cart
        }
    },

    removeItem: async (userId, productId, variant = null) => {
        const cart =  await PurchaseCart.findOne({userId});
        if(!cart) throw new AppError('Carrito no encontrado', 404);

        const initialLength = cart.items.length;

        cart.items = cart.items.filter( item => 
            !(
                item.productId.equals(productId) &&
                (variant? item.variant === variant : true )
            )
        );

        if(cart.items.length === initialLength) {
            throw new AppError('Producto no encontrado en el carrito', 404);
        }

        await cart.save();
        return {
            message: 'Producto eliminado del carrito',
            data: cart
        }
    },

    updateItemQuantity: async (userId, productId, quantity, variant = null) => {
        const cart = await PurchaseCart.findOne({userId});
        if(!cart) throw new AppError('Producto no encontrado en el carrito', 404);

        const item = cart.items.find(item => 
            item.productId.equals(productId) && item.variant === variant
        );

        if(!item) throw new AppError('Producto no encontrado en el carrito', 404);

        if(quantity <= 0){
            cart.items = cart.items.filter(i => i !== item);
        } else {
            item.quantity = quantity;
        }

        await cart.save();
        return {
            message: 'Cantidad actualizada',
            data: cart
        };
    },

    cleanCart: async (userId) => {
        const cart = await PurchaseCart.findOne({userId});
        if(!cart) throw new AppError('Carrito no encontrado', 404);

        cart.items = [];
        await cart.save()

        return {
            message: 'Carrito vaciado correctamente',
            data: cart
        }
    },

    deleteCart: async (userId) => {
        const deleted = await PurchaseCart.findOneAndDelete({userId});
        if(!deleted) throw new AppError('Carrito no encontrado', 404); 
        
        return{
            message: 'Carrito eliminado correctamente'
        };
    },

    getAllCarts: async () => {
        const carts = await PurchaseCart.find().populate('userId items.productId');
        if(carts.length === 0) throw new AppError('No se encontró ningun carrito', 404);        
        return {
            data: carts
        }
    },

    countCarts: async () => {
        const count = await PurchaseCart.countDocuments();
        return {
            count: count
        }
    },

    // (ADMIN) Quitar un producto de TODOS los carritos (ej. producto deshabilitado)
    removeProductFromAllCarts: async (productId) => {
        // 1. Encuentra todos los carritos que contienen el producto
        const carts = await PurchaseCart.find({ 'items.productId': productId} );
        if(carts.length === 0) throw new AppError('No se encontró ningun carrito', 404);

        let updatedCount = 0;

        for(const cart of carts){
            // filtramos el producto que no queremos que esté dentro de los items
            cart.items = cart.items.filter( item => item.productId.toString() !== productId.toString());

            // Recalculamos el total ahora que hemos sacado ese producto de los carritos
            cart.total = cart.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
            
            await cart.save();
            updatedCount++;
        }

        return {
            message: `Producto eliminado de ${updatedCount} carrito(s)`
        };
    }

}

module.exports = cartService;