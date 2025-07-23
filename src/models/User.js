const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["admin", "client"],
        default: "client"
    },
    config: {
        theme: String,
        language: String,
    },
    refreshToken: {
        type: String, 
        default: ''
    }
}, { timestamps: true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    } else {
        try {
            this.password = await bcrypt.hash(this.password,10);
            next();
        } catch (err) {
            next(err)   
        }
    } 
})

userSchema.methods.comparePassword = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model('User', userSchema);