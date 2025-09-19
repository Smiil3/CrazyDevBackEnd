const Joi = require("joi");
const getUserAdsSchema = Joi.object({
  userId: Joi.number().integer().required(),
});

module.exports = getUserAdsSchema;
