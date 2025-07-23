const PaymentMethod = require('../models/PaymentMethod');

const paymentMethodService = {
    create: async(name, description, isActive = true) => {
        const existing = await PaymentMethod.findOne({name});
        if(existing) throw new Error('Este método de pago ya existe');

        const method = new PaymentMethod({name, description, isActive});
        await method.save();

        return {
            message: 'Método de pago creado correctamente',
            method
        };
    },

    update: async(id, data) => {
        const updatedMethod = await PaymentMethod.findByIdAndUpdate(id, data, { new: true });
        if(!updatedMethod) throw new Error('Método de pago no encontrado');

        return {
            message: 'Metodo de pago actualizado correctamente.',
            paymentMethod: updatedMethod
        };
    },

    getAll: async() => {
        const methods = await PaymentMethod.find({});
        if(methods.length === 0) throw new Error('No se encontró ningún metodo de pago');
        return methods
    },

    getById: async(id) => {
        const method = await PaymentMethod.findById(id);
        if(!method) throw new Error('Método de pago no encontrado');
        return method;
    },

    delete: async(id) => {
        const method = await PaymentMethod.findByIdAndDelete(id);
        if(!method) throw new Error('Método de pago no encontrado');
        return {
            message: 'Metodo de pago eliminado correctamente'
        };
    }
}

module.exports = paymentMethodService;