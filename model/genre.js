const mongoose = require('mongoose');

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
const Genre = mongoose.model('Genre', schema)

exports.Genre = Genre
exports.schema = schema