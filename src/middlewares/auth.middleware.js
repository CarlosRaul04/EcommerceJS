const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'jw123wqe12ewqdWSADFQWDASDssadas';

// Verifica el token
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if(!token) return res.status(401).json({ 
        error: 'Token no proporcionado'
    });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Aquí se está guardando los atributos del decoded en el req
        req.user = decoded; // Guarda el payload: { id, role }
        next();
    } catch (err) {
        return res.status(403).json({
            error: 'Token inválido o expirado'
        });
    }
}

// Middleware adicional para proteger rutas admin
exports.isAdmin = (req, res, next) => {
    if(req.user?.role !== 'admin'){
        return res.status(403).json({
            error: 'Acceso denegado: Solo para Admin'
        })
    }
    next();
};

exports.canEditUser = (req, res, next) => {
    // En esta linea estamos guardando el id del usuario logeado
    const userId = req.user.id;
    // En esta linea se está guardando el id que se ha puesto en la ruta
    const paramId = req.params.id; 
    const userRole = req.user.role;

    if( userRole === 'admin' || userId === paramId) {
        next();
    } else {
        return res.status(403).json({
            message: 'No autorizado para modificar este usuario'
        });
    }
};