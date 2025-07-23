const Order = require('../models/Order');
const Billing = require('../models/Billing');
const PaymentMethod = require('../models/PaymentMethod');

const orderService = {
    createOrder: async(userId, { items, billingId, paymentMethod, shippingDate = null }) => {
        // Validamos los items
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('La orden debe contener al menos un producto');
        }

        for(const item of items){
            if(!item.productId || !item.quantity || !item.price){
                throw new Error('Cada producto debe tener productId, quantity y price');
            }
        }

        // Validamos el billingId
        if(!billingId) {
            throw new Error('Se requiere el ID de facturación (billingId)');
        }

        const billing = await Billing.findOne({ _id: billingId, userId });
        if(!billing) {
            throw new Error('La información de facturación no es válida o no pertenece al usuario');
        }

        // Validamos el método de pago
        if(!paymentMethod) {
            throw new Error('Se requiere un método de pago');
        }

        const payment = await PaymentMethod.findOne({_id: paymentMethod});
        if(!payment || !payment.isActive){
            throw new Error('El método de pago es inválido o está inactivo')
        }

        const order = new Order({
            userId,
            items,
            billingId,
            paymentMethod,
            shippingDate,
        });

        await order.save();

        return {
            message: 'Orden creada correctamente',
            data: order
        }

    },

    getOrdersByUser: async(userId) => {
        const orders = await Order.find({ userId }).populate('billingId paymentMethod');
        return {
            orders: orders
        };
    },

    getOrderById: async(orderId, userId) => {
        const order = await Order.findOne({ _id: orderId, userId }).populate('billingId paymentMethod')
        if(!order) throw new Error('Orden no encontrada');
        return order;
    },

    getAllOrders: async(page = 1, limit= 10) => {
        const skip = (page - 1) * limit;

        const [orders, total] = await Promise.all([
            Order.find()
                .populate('userId billingId paymentMethod')
                .skip(skip)
                .limit(limit)
                .sort({ created: -1 }), // pone los ultimos pedidos primero
            Order.countDocuments()            
        ]);

        return {
            total,
            page,
            totalPages: Math.ceil(total/limit),
            data: orders
        };
    },

    updateOrderStatus: async(orderId, status) => {
        const allowedStatuses = ['Pendiente', 'En camino', 'Entregado', 'Cancelado'];
        if(!allowedStatuses.includes(status)) throw new Error('Estado de orden inválido');

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true});
        if(!order) throw new Error('Orden no encontrada');
        
        return {
            message: "Estado de la orden actualizado",
            data: order
        };
    },

    markAsPaid: async(orderId) => {
        const order = await Order.findById(orderId);
        if(!order) throw new Error('Orden no encontrada');

        order.isPaid = true;
        order.paidAt = new Date();
        await order.save();

        return{
            message: 'Orden marcada como pagada',
            order
        };
    },

    deleteOrder: async(orderId) => {
        const order = await Order.findByIdAndDelete(orderId);
        if(!order) throw new Error('No se encontró ninguna orden');
        return{
            message: 'Orden eliminada correctamente'
        };
    },

    cancelOrderByUser: async(orderId, userId) => {
        const order = await Order.findOne({ _id: orderId, userId });
        if(!order) throw new Error('Orden no encontrada');
        if(order.status !== 'pending') throw new Error('No se puede cancelar esta orden');

        order.status = 'Cancelado';
        await order.save();
        return {
            message: 'Orden cancelada'
        };
    },

    cancelOrderByAdmin: async(orderId) => {
        const order = await Order.findById(orderId);
        if(!order) throw new Error('Orden no encontrada');

        order.status = 'Cancelado';
        await order.save();
        return {
            message: 'Orden cancelada por el administrador'
        };
    },


}

module.exports = orderService;