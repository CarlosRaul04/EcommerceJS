const User = require('../models/User');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');


const REFRESH_SECRET = process.env.REFRESH_SECRET;


exports.refreshToken = async (req, res ,next) => {
    const token = req.cookies?.refreshToken;
    
    if(!token){
        return res.status(401).json({ message: `No refresh token enviado` });
    }

    try {
        const decoded = jwt.verify(token, REFRESH_SECRET);

        const user = await User.findById(decoded.id);
        if( !user || !user.refreshToken) {
            return res.status(403).json({ message: 'Refresh token inválido '});
        }

        // Comparamos el token plano (cookie) con el hash en BD
        const isValid = await bcrypt.compare(token, user.refreshToken);
        if(!isValid){
            return res.status(403).json({ message: 'Refresh token inválido'});
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

        user.refreshToken = newRefreshTokenHash;
        await user.save();

        res
            .cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
            })
            .json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await authService.loginUser(email, password);

        // Creamos una cookie segura que almacene el refresh Token 
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', // 'Lax' para menos restricciones
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(200).json({
            message: 'Login exitoso',
            accessToken,
            user
        });
    } catch (err) {
        next(err);
    };
};

exports.logout = async(req, res, next) => {
    try {
    const token  = req.cookies?.refreshToken;
    if(!token) return res.sendStatus(204);

    const user = await User.findOne({ refreshToken: token });
    if( user ) {
        user.refreshToken = null;
        await user.save();
    }

    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict'});
    res.json({
        message: 'Sesión cerrada con éxito'
    });
    } catch (err) {
        next(err);   
    }
}

exports.register = async(req, res, next) => {
    try {
        const {name, email, password, role} = req.body;
        const result = await authService.createUser(name, email, password, role);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    };
};

exports.getMyProfile = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await authService.getMyProfile(userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

exports.getById = async(req, res, next) => {
    try {
        const user = await authService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    };
}

exports.getAll = async(req, res, next) => {
    try {
      const users = await authService.getAll();
      res.json(users);  
    } catch (err) {
        next(err);
    };
}

exports.updateUser = async (req, res, next) => {
    try {
        const result = await authService.updateUser(req.params.id, req.body)
        res.json(result);
    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async (req,res, next) => {
    try {
        const result = await authService.deleteUser(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

