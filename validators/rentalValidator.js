const Joi = require('joi');

exports.vd_rental = (body) => {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })

    return schema.validate(body)
}