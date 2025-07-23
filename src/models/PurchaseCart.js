// Definir el esquema de carrito con subdocumentos de items
const mongoose = require('mongoose');
const { Schema } =  mongoose;
const itemSchema = require('./itemSchema');

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Un usuario solo puede tener un carrito
    },
    items: [
        itemSchema // Array de subdocumentos de items
    ],
    total: {
        type: Number, // Define el tipo de dato como Number
        default: 0, // Valor por defecto es 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true});

// Pre-save hook --> Antes de guardarse (recalcule el total)
cartSchema.pre("save", function(next){
    this.total = this.items.reduce(( acc, item ) => {
        return acc + (item.quantity * item.price); // Lo que hace es sumar el total de todos los items, el acc es el acumulador y comienza en 0
    }, 0);
    next();
})

module.exports = mongoose.model('Cart', cartSchema); // Exporta el modelo de carrito