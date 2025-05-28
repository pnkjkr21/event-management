const Joi = require('joi')

exports.signupSchema = Joi.object({
    email: Joi.string().min(6).max(30).required().email({
        tlds: { allow: ['com', 'net'] }
    }),
    password: Joi.string().required()
})

exports.loginSchema = Joi.object({
    email: Joi.string().required().email({
        tlds: { allow: ['com', 'net'] }
    }),
    password: Joi.string().required()
})

exports.eventSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),

  description: Joi.string().trim().allow('').optional().messages({
    'string.base': 'Description must be a string',
  }),

  date: Joi.date().iso().required().messages({
    'any.required': 'Date is required',
    'date.base': 'Date must be a valid ISO format',
    'date.format': 'Date must be in ISO 8601 format',
  }),

  location: Joi.string().trim().required().messages({
    'any.required': 'Location is required',
    'string.empty': 'Location cannot be empty',
  }),

  capacity: Joi.number().integer().min(1).required().messages({
    'any.required': 'Capacity is required',
    'number.base': 'Capacity must be a number',
    'number.min': 'Capacity must be at least 1',
  }),
});

