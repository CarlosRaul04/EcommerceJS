const SupplyInventory = require('../models/SupplyInventory');
const InventoryMovement = require('../models/InventoryMovement.js');
const AppError = require('../utils/AppError.js');

const inventoryService = {
    createSupply: async( supplyData ) => {
        const { name, sku } = supplyData;
        const existing = await SupplyInventory.findOne({
            $or: [ { name }, { sku } ]
        });

        if(existing) throw new AppError('Ese insumo ya existe', 400);
        const newSupply = new SupplyInventory( supplyData );
        await newSupply.save();

        return {
            message: 'Insumo creado correctamente',
            data: newSupply
        }
    },

    getAllSupplies: async() => {
        const supplies = await SupplyInventory.find({});
        if(supplies.length === 0 ) throw new AppError('No hay ningun insumo', 404);
        return supplies;
    },

    getSupplyById: async( id ) => {
        const supply = await SupplyInventory.findById(id);
        if(!supply) throw new AppError('No se encontró insumo a actualizar', 404);
        return supply;
    },

    updateSupply: async( id, updatedData ) => {
        const supply = await SupplyInventory.findByIdAndUpdate(id, updatedData, { new: true });
        if(!supply) throw new AppError('El insumo no existe', 404);

        return {
            message: 'Insumo actualizado correctamente',
            data: supply
        };
    },
    
    deleteSupply: async( id ) => {
        const supply = await SupplyInventory.findByIdAndDelete(id);
        if(!supply) throw new AppError('No se encontró insumo a eliminar', 404);
    },

    recordMovement: async({ supplyId, type, quantity, note = "", userId }) => {
        const supply = await SupplyInventory.findById(supplyId);
        if(!supply) throw new AppError('No se encontró el insumo', 404);

        if( type === 'Salida' && supply.quantity < quantity){
            throw new AppError('Cantidad insuficiente en el inventario', 400);
        }

        if( type === 'Entrada') {
            supply.quantity += quantity;
        } else if(type === 'Salida') {
            supply.quantity -= quantity;
        } else if(type === 'Ajuste') {
            supply.quantity = quantity;
        }

        await supply.save();

        const movement = new InventoryMovement({
            supply: supplyId,
            type,
            quantity,
            note,
            user: userId
        })
        await movement.save();

        return {
            message: 'Movimiento realizado correctamente',
            data: movement
        };
    },

    getMovementsByUser: async (user) => {
        const movements = await InventoryMovement.find({user}).populate('user supply');
        if(!movements.lenth === 0) throw new AppError('Este usuario no ha hecho ningun movimiento', 404);
        return movements;
    },

    getMyMovements: async(user) => {
        const movements = await InventoryMovement.find({user}).populate('supply');
        if(!movements.lenth === 0) throw new AppError('Este usuario no ha hecho ningun movimiento', 404);
        return movements;
    }
}

module.exports = inventoryService;