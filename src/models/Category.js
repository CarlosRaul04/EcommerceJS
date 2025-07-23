const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },

    // Define que esta categoría puede tener una categoría padre
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null  
    }
}, { timestamps: true } /* Para agregar createdAt y updatedAt*/ );

module.exports = mongoose.model('Category', categorySchema);