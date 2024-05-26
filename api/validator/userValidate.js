const Joi = require("joi");

// Validation function
function validateUser(user) {
    const schema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().min(5).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
  }

  module.exports = validateUser