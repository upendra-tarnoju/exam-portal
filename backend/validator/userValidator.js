const Joi = require('Joi');

module.exports = {
	SIGNUP: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(true),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		}),
		mobileNumber: Joi.string()
			.length(10)
			.pattern(/^[0-9]+$/)
			.required(),
		password: Joi.string().required(),
	}),
};
