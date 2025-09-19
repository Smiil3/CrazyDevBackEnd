const Joi = require("joi");
const userRegisterSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = userRegisterSchema;
