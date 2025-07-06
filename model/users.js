const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.isPasswdValid = async function (raw_passwd) {
    return await bcrypt.compare(raw_passwd, this.password);
}

userSchema.methods.genAuthToken = function () {
    const token = jwt.sign(_.pick(this, ['_id', 'name', 'email', 'isAdmin']), process.env.jwtPrivateKey)
    return token;
}

exports.User = mongoose.model('User', userSchema)





