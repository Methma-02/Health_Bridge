const joi = require('joi');

const registrationSchema = joi.object({
  fullName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  phone: joi.string().required(),
  role: joi.string().valid('mother', 'physician', 'nurse', 'midwife', 'phm', 'admin').required(),
  mohDivision: joi.string().allow(''),
  governmentRegNumber: joi.string().allow(''),
  workPlace: joi.string().allow('')
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

function validateRegistration(req, res, next) {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = { validateRegistration, validateLogin };