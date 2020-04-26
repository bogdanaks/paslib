// Validation data
const Joi = require('@hapi/joi')

// Register & Login validation
const authValidation = body => {
    const schema = Joi.object({
        login: Joi.string().min(4).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(body)
}


module.exports.authValidation = authValidation