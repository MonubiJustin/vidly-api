const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    }
}) 
const Genre = mongoose.model('Genre', schema);

module.exports = {
    Genre,
    schema
}

