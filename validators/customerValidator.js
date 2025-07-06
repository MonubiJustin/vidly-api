const Joi = require('joi');

// validating customers body inputs
exports.vd_customers = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        phone: Joi.string().required(),
        isGold: Joi.string()
    })

    return schema.validate(body)
}