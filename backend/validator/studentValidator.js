const Joi = require('joi');

module.exports = {
	VALIDATE_EXAM_KEY: {
		body: Joi.object({
			examId: Joi.string().required().length(24),
			password: Joi.string().required(),
		}),
	},
};
