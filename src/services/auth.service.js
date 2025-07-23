const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET || 'jw123wqe12ewqdWSADFQWDASDssadas';

const authService = {
    loginUser: async (email, password) => {
        const user = await User.findOne({ email });
        if(!user) throw new Error('Usuario no encontrado');

        const isMatch = await user.comparePassword(password);
        if(!isMatch) throw new Error('Contraseña incorrecta');

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Hasheamos el token antes de guardar en la bd
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        user.refreshToken = refreshTokenHash;
        await user.save();

        return{
            accessToken,
            refreshToken, // Se envía sin hashear para el cookie
            user
        };
    },
    
    getMyProfile: async(id) => {
        const user = await User.findById(id);
        if(!user) throw new Error('Usuario no encontrado');

        return user;
    },

    getAll : async() => {
        const users = await User.find({});
        if( users.length <= 0) throw new Error('No hay ningun usuario');
        return users;
    },

    getUserById: async(id) => {
        const user = await User.findById(id);
        if(!user) throw new Error('Usuario no encontrado');

        return user;
    },

    createUser: async (name, email, password, role) => {

        const existingUser = await User.findOne({ email })
        if(existingUser) throw new Error('El correo ya está registrado');

        const user = new User({ 
            name, 
            email, 
            password, 
            role,
            config: {
                theme: '',
                language: ''
            } 
        });

        await user.save();

        return{
            message: 'Usuario registrado exitosamente',
            user
        };
    },

    updateUser: async (id, nuevosDatos) => {
        const user = await User.findByIdAndUpdate(id, nuevosDatos, { new: true});
        if(!user) throw new Error('Usuario no encontrado');

        return {
            message: 'Usuario actualizado correctamente',
            user
        };
    },

    deleteUser: async (id) => {
        const user = await User.findByIdAndDelete(id);
        if(!user) throw new Error('Usuario no encontrado');

        return {
            message: 'Usuario eliminado exitosamente'
        };
    }

}


module.exports = authService;