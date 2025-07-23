const mongoose = require('mongoose');
const itemSchema = require('./itemSchema');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        itemSchema
    ],
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Pendiente', 'En camino', 'Entregado', 'Cancelado'],
        default: 'Pendiente'
    },
    billingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Billing',
        required: true
    },
    paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod'
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    shippingDate: Date
}, { timestamps: true}); 

// Pre-save hook
// para que calcule el total antes de guardarse
orderSchema.pre("save", function(next){
    this.total = this.items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);
    next();
})

module.exports = mongoose.model('Order', orderSchema);