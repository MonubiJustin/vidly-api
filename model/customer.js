const mongoose = require('mongoose')
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    isGold: {
        type: Boolean,
        default: false
        // required: true
    },
    phone: {
        type: String,
        required: true
    } 
}))

module.exports =  Customer