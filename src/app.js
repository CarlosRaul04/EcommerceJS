const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Conexión de la BD
const connectBD = require('./config/bd');
// Rutas
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const billingRoutes = require('./routes/billing.routes');
const paymentMethodRoutes = require('./routes/paymentMethod.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');
const inventoryRoutes = require('./routes/inventory.routes');
const searchRoutes = require('./routes/search.routes');

const app = express();

// configuración de CORS
app.use(cors({
    origin: 'http://localhost:5487', // ajustamos el puerto del frontend
    credentials: true // permite cookies
}))
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cookieParser());
// Para analizar datos recibidos de formularios HTML
app.use(express.urlencoded({ extended: true }));
// Logger con morgan
app.use(morgan('dev'));

//Usamos el método para conectarnos a la bd
connectBD();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use('/melodie/auth', authRoutes);
app.use('/melodie/category', categoryRoutes);
app.use('/melodie/product', productRoutes);
app.use('/melodie/billing', billingRoutes);
app.use('/melodie/paymentMethod', paymentMethodRoutes);
app.use('/melodie/order', orderRoutes);
app.use('/melodie/cart', cartRoutes);
app.use('/melodie/inventory', inventoryRoutes);
app.use('/melodie/search', searchRoutes);

//Middleware para manejo de errores
app.use((error, req, res, next) => {
    console.error(error.stack); // Log en consola

    const statusCode = error.statusCode || 500; // si no hay ningun statusCode usa 500
    const message = error.message || 'Error interno del servidor';

    res.status(statusCode).json({
        status: 'error',
        message
    });
});

module.exports = app;