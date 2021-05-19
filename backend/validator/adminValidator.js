const { query, body } = require('express-validator');
const APP_DEFAULTS = require('../config/app-defaults');

module.exports = {
	ADMIN_EXAMINER_DETAILS: [
		query('pageIndex').not().isEmpty().withMessage('Required page index'),
		query('pageSize').not().isEmpty().withMessage('Required page size'),
		query('type')
			.not()
			.isEmpty()
			.withMessage('Required type')
			.isIn([
				APP_DEFAULTS.EXAMINER_QUERY_TYPE.LATEST_EXAMINER,
				APP_DEFAULTS.EXAMINER_QUERY_TYPE.PENDING,
				APP_DEFAULTS.EXAMINER_QUERY_TYPE.DECLINED,
				APP_DEFAULTS.EXAMINER_QUERY_TYPE.APPROVED,
			])
			.withMessage('Invalid value for type'),
	],
	APPROVE_DECLINE_EXAMINER: [
		body('examinerId').not().isEmpty().withMessage('Required examiner id'),
	],

	APPROVE_DECLINE_SUBADMIN: [
		body('subAdminId')
			.not()
			.isEmpty()
			.withMessage('Required sub admin id')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid sub admin id'),
		body('status').not().isEmpty().withMessage('Required status'),
		// .isIn([
		// 	APP_DEFAULTS.ACCOUNT_STATUS.DECLINED,
		// 	APP_DEFAULTS.ACCOUNT_STATUS.APPROVED,
		// ])
		// .withMessage('Invalid value for status'),
	],
};
