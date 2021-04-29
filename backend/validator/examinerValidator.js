const { query, body } = require('express-validator');

module.exports = {
	GET_COURSES: [
		query('pageIndex')
			.optional()
			.isNumeric()
			.withMessage('Page index must be number'),
		query('pageSize')
			.optional()
			.isNumeric()
			.withMessage('Page size must be number'),
		query('name')
			.optional()
			.isString()
			.withMessage('Course name must be string'),
		query('startDate')
			.optional()
			.isString()
			.withMessage('Start date must be string'),
		query('endDate')
			.optional()
			.isString()
			.withMessage('End date must be string'),
		query()
			.custom((query) => {
				const keys = ['pageIndex', 'pageSize', 'name', 'startDate', 'endDate'];
				return Object.keys(query).every((key) => keys.includes(key));
			})
			.withMessage('Some extra parameters are sent'),
	],
	SAVE_COURSE: [
		body('courseId').not().isEmpty().withMessage('Course id is required'),
		body('description')
			.not()
			.isEmpty()
			.withMessage('Course description is required'),
	],
	DELETE_COURSE: [
		query('courseId').not().isEmpty().withMessage('Course id is required'),
		query()
			.custom((query) => {
				const keys = ['courseId'];
				return Object.keys(query).every((key) => keys.includes(key));
			})
			.withMessage('Some extra parameters are sent'),
	],
};
