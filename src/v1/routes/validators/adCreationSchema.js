const Joi = require("joi");
const adCreationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  ecoZoneId: Joi.string().required(),
  roomTypeId: Joi.string().required(),
});

module.exports = adCreationSchema;
