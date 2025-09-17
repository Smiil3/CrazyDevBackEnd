const Joi = require("joi");

const getAdsSchema = Joi.object({
    location: Joi.number().integer().optional(),
})

module.exports = getAdsSchema