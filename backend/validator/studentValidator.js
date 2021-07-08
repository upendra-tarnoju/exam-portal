const Joi = require('joi');

const APP_CONSTANTS = require('../config/app-defaults');

module.exports = {
	VALIDATE_EXAM_KEY: {
		body: Joi.object({
			examId: Joi.string().required().length(24),
			password: Joi.string().required(),
		}),
	},
	PARTICULAR_EXAM_QUESTION: {
		query: Joi.object({
			pageIndex: Joi.number().required(),
		}),
		params: Joi.object({
			examId: Joi.string().required().length(24),
		}),
	},
	SAVE_QUESTION_ANSWER: {
		body: Joi.object({
			examId: Joi.string().required().length(24),
			questionId: Joi.string().required().length(24),
			answer: Joi.string().required().allow(''),
			status: Joi.string()
				.required()
				.valid(
					APP_CONSTANTS.STUDENT_ANSWER_STATUS.ATTEMPTED,
					APP_CONSTANTS.STUDENT_ANSWER_STATUS.CLEARED,
					APP_CONSTANTS.STUDENT_ANSWER_STATUS.REVIEW
				),
		}),
	},
};
