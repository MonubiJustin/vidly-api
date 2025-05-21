const mongoose = require('mongoose')
const { schema } = require('./genre')
const Joi = require('joi')



const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlenght: 255

    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    genre: {
        type: schema,
        required: true
    }
}))

function validate(body) {
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(255).lowercase(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
        genreid: Joi.objectId().required()
    })

    return schema.validate(body)
}

exports.Movie = Movie
exports.validate = validate