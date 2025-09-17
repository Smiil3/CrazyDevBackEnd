const Joi = require("joi");
const adCreationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    ecoZoneId: Joi.number().integer().required(),
    roomTypeId: Joi.number().integer().required()
});

module.exports = adCreationSchema
