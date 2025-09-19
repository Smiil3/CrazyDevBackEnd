const Joi = require("joi");
const adDetailsSchema = Joi.object({
  adId: Joi.number().integer().required(),
});

module.exports = adDetailsSchema;
