const Joi = require('joi');

exports.reg_validate = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(255).lowercase(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(body)
}

exports.log_validate = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(body)
}