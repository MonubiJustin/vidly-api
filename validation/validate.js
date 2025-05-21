const Joi = require('joi');

function vd_genres(body) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });

    return schema.validate(body)
}

function vd_customers(body) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        phone: Joi.string().required(),
        isGold: Joi.string()
    })

    return schema.validate(body)
}

function vd_movies(body) {
    const schema = Joi.object({
        title: Joi.string().required(),
        
    })
}

exports.vd_genres = vd_genres;
exports.vd_customers = vd_customers