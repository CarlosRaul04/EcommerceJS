const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role},
        JWT_SECRET,
        { expiresIn: '15m'}
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
}