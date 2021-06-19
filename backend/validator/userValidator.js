const Joi = require('joi');

const userValidator = {
	LOGIN_USER: {
		body: Joi.object({
			username: Joi.string().required(),
			password: Joi.string().required(),
		}),
	},

	SIGNUP_USER: {
		body: Joi.object({
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			mobileNumber: Joi.string().required().trim(),
			college: Joi.object({
				_id: Joi.string().required(),
				name: Joi.string().required(),
			}),
		}),
	},
};

module.exports = userValidator;
