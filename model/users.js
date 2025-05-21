const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const config = require('config')
const _ = require('lodash')



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

userSchema.methods.genAuthToken = function () {
    const token = jwt.sign(_.pick(this, ['_id', 'name', 'email', 'isAdmin']), config.get('jwtPrivateKey'))
    return token;
}

const User = mongoose.model('User', userSchema)

function validate(body) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(255).lowercase(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(body)
}

function auth_validate(body) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(body)
}

exports.User = User;
exports.validate = validate;
exports.auth_validate = auth_validate