const Joi = require("joi");

// Validation function
function validateStaff(staff) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      gender: Joi.string().required(),
      address: Joi.string(),
      role: Joi.string(),
      DOB: Joi.date().required(),
      salary: Joi.string(),
      qualification: Joi.string(),
      classes: Joi.array().items(Joi.string()),
      section: Joi.string(),
      subjects: Joi.array().items(Joi.string()),
      classTeacher: Joi.string()
    });
    return schema.validate(staff);
  }

  module.exports = validateStaff
