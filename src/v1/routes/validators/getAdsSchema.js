const Joi = require("joi");

const getAdsSchema = Joi.object({
  ecoZoneId: Joi.number().integer().optional(),
});

module.exports = getAdsSchema;
