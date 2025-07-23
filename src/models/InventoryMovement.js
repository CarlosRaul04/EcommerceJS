const mongoose = require('mongoose');
const Schema = mongoose.Schema

const inventoryMovementSchema = new Schema({
    supply: {
        type: Schema.Types.ObjectId,
        ref: 'SupplyInventory',
        required: true
    },
    type: {
        type: String,
        enum: ['Entrada', 'Salida', 'Ajuste'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('InventoryMovement', inventoryMovementSchema);