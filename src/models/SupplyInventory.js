const mongoose = require('mongoose');

const supplyInventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    required: true
  },
  category: {
    type: String,
    enum: ['ingrediente', 'empaque', 'decoración', 'otro'],
    default: 'ingrediente'
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'g', 'l', 'ml', 'unidad', 'caja', 'otros'],
    default: 'unidad',
    lowercase: true
  },
  costPerUnit: {
    type: Number,
    required: true,
    default: 0
  },
  minStock: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    default: 'almacén principal'
  },
  supplier: {
    type: String
  },
  expirationDate: {
    type: Date
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Actualiza la fecha de modificación
supplyInventorySchema.pre('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model('SupplyInventory', supplyInventorySchema);