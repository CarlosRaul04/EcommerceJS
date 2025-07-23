const mongoose = require('mongoose');

// Conectamos a la base de datos de MongoDB

const connectBD = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado...');
    } catch (error) {
        console.log("Error de conexión...", error);
    }
}

module.exports = connectBD;