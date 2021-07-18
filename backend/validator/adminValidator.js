const Joi = require('joi');

const APP_DEFAULTS = require('../config/app-defaults');

const adminValidator = {
	EXAM_DETAILS: {
		query: Joi.object({
			minDate: Joi.number().required(),
			maxDate: Joi.number().required(),
		}),
	},
	EXAMINER_DETAILS: {
		query: Joi.object({
			pageIndex: Joi.number().required(),
			pageSize: Joi.number().required(),
			email: Joi.string(),
			name: Joi.string(),
			status: Joi.string().valid(
				APP_DEFAULTS.ACCOUNT_STATUS.APPROVED,
				APP_DEFAULTS.ACCOUNT_STATUS.PENDING,
				APP_DEFAULTS.ACCOUNT_STATUS.DECLINED
			),
		}),
	},
	APPROVE_DECLINE_EXAMINER: {
		body: Joi.object({
			examinerId: Joi.string().required().length(24),
			status: Joi.string().valid(
				APP_DEFAULTS.ACCOUNT_STATUS.APPROVED,
				APP_DEFAULTS.ACCOUNT_STATUS.DECLINED
			),
		}),
	},
	APPROVE_DECLINE_SUBADMIN: {
		body: Joi.object({
			subAdminId: Joi.string().required().length(24),
			status: Joi.string().valid(
				APP_DEFAULTS.ACCOUNT_STATUS.APPROVED,
				APP_DEFAULTS.ACCOUNT_STATUS.DECLINED
			),
		}),
	},
	SUB_ADMIN_DETAILS: {
		query: Joi.object({
			pageIndex: Joi.number().required(),
			pageSize: Joi.number().required(),
			email: Joi.string(),
			name: Joi.string(),
			status: Joi.string().valid(
				APP_DEFAULTS.ACCOUNT_STATUS.APPROVED,
				APP_DEFAULTS.ACCOUNT_STATUS.PENDING,
				APP_DEFAULTS.ACCOUNT_STATUS.DECLINED
			),
		}),
	},
	UPDATE_SETTINGS: {
		body: Joi.object({
			smtpCredentials: Joi.object({
				smtpSenderEmail: Joi.string().required(),
				smtpAPIKey: Joi.string().required(),
				smtpServiceName: Joi.string().required(),
			}).optional(),
		}),
	},
	RESET_PASSWORD: {
		body: Joi.object({
			newPassword: Joi.string().required(),
		}),
	},
};

module.exports = adminValidator;
