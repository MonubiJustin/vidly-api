const Joi = require('joi')

exports.vd_movie = (body) => {
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(255).lowercase(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
        genreid: Joi.objectId().required()
    })

    return schema.validate(body)
}