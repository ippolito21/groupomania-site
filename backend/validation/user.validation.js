const Joi = require("joi");

function validateUser(user) {
  const userSchemaSignup = Joi.object({
    username :  Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });
  const userSchemLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return {
    userSchemLogin : userSchemLogin.validate(user),
    userSchemaSignup : userSchemaSignup.validate(user)
  } 
}

module.exports = validateUser;
