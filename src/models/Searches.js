const mongoose = require('mongoose');
const { Schema } = mongoose;

const searchesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Para mejorar el rendimiento al consultar
    },
    query: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

searchesSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Searches', searchesSchema);