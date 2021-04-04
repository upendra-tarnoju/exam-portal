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
			])
			.withMessage('Invalid value for type'),
	],
	APPROVE_DECLINE_EXAMINER: [
		body('examinerId').not().isEmpty().withMessage('Required examiner id'),
	],
};
