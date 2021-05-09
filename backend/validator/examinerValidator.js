const { query, body, param } = require('express-validator');

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
		body().custom((body) => {
			const keys = ['courseId', 'description'];
			return Object.keys(body).every((key) => keys.includes(key));
		}),
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

	UPDATE_COURSE: [
		body('previousCourseId')
			.not()
			.isEmpty()
			.withMessage('Previous course id is required'),
		body('newCourseId')
			.not()
			.isEmpty()
			.withMessage('New course id is required'),
		body('description')
			.not()
			.isEmpty()
			.withMessage('Course description is required'),
		body().custom((body) => {
			const keys = ['previousCourseId', 'newCourseId', 'description'];
			return Object.keys(body).every((key) => keys.includes(key));
		}),
	],

	DELETE_EXAM: [
		query('examId')
			.not()
			.isEmpty()
			.withMessage('Exam id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid exam id'),
		query()
			.custom((query) => {
				const keys = ['examId'];
				return Object.keys(query).every((key) => keys.includes(key));
			})
			.withMessage('Some extra parameters are sent'),
	],

	SAVE_EXAM: [
		body('subject').not().isEmpty().withMessage('Subject is required'),
		body('course').not().isEmpty().withMessage('Course id is required'),
		body('examCode').not().isEmpty().withMessage('Exam code is required'),
		body('password').not().isEmpty().withMessage('Password is required'),
		body('totalMarks')
			.not()
			.isEmpty()
			.withMessage('Total marks is required')
			.isNumeric()
			.withMessage('Total marks must be numeric'),
		body('passingMarks')
			.not()
			.isEmpty()
			.withMessage('Passing marks is required')
			.isNumeric()
			.withMessage('Passing marks must be numeric'),
		body('negativeMarks')
			.not()
			.isEmpty()
			.withMessage('Negative marks is required')
			.isNumeric()
			.withMessage('Negative marks must be numeric'),
		body('examDate').not().isEmpty().withMessage('Exam date is required'),
		body('startTime').not().isEmpty().withMessage('Start time is required'),
		body('endTime').not().isEmpty().withMessage('End time is required'),
		body('hideDuration')
			.not()
			.isEmpty()
			.withMessage('Hide duration is required')
			.isBoolean('Hide duratiion must be numeric'),
		body('duration')
			.optional({ nullable: true, checkFalsy: true })
			.isNumeric()
			.withMessage('Duration must be numeric'),
		body()
			.custom((query) => {
				const keys = [
					'subject',
					'course',
					'examCode',
					'totalMarks',
					'passingMarks',
					'negativeMarks',
					'examDate',
					'startTime',
					'endTime',
					'hideDuration',
					'duration',
					'password',
				];
				return Object.keys(query).every((key) => keys.includes(key));
			})
			.withMessage('Some extra parameters are sent'),
	],

	GET_EXAMS: [
		query('pageIndex')
			.optional()
			.isNumeric()
			.withMessage('Page index must be number'),
		query('pageSize')
			.optional()
			.isNumeric()
			.withMessage('Page size must be number'),
		query()
			.custom((query) => {
				const keys = ['pageIndex', 'pageSize'];
				return Object.keys(query).every((key) => keys.includes(key));
			})
			.withMessage('Some extra parameters are sent'),
	],

	UPDATE_EXAM: [
		param('examId')
			.not()
			.isEmpty()
			.withMessage('Exam id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid exam id'),
		body('course').optional(),
		body('examCode').optional(),
		body('subject').optional(),
		query()
			.custom((query) => {
				const keys = ['examId', 'course', 'examCode', 'subject'];
				return Object.keys(query).every((key) => keys.includes(key));
			})
			.withMessage('Some extra parameters are sent'),
	],

	GET_EXAM_DETAILS: [
		param('examId')
			.not()
			.isEmpty()
			.withMessage('Exam id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid exam id'),
	],
};
