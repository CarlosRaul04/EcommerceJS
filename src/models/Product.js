const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: false,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    images: [String],
    variants: [{
        name: {
            type: String
        },
        price: {
            type: Number
        },
        description: {
            type: String
        },
        available: {
            type: Boolean,
            default: true
        }
    }],
    reviews: [{
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating : {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true} /* Para agregar createdAt y updatedAt */);

module.exports = mongoose.model('Product', productSchema);