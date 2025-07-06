const Joi = require('joi');

// vaidating genres body inputs
exports.vd_genres = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });

    return schema.validate(body)
}