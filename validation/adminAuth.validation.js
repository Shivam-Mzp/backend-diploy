const Joi = require("joi");

module.exports = {
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),

  assignRole: Joi.object({
    roles: Joi.array(),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().required(),
  }),

  resetPassword: Joi.object({
    email: Joi.string().required(),
    otpCode: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
