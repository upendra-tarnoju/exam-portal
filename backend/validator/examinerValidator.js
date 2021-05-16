const { query, body, param } = require('express-validator');
const APP_CONSTANTS = require('../config/app-defaults');

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
		query('name').optional(),
		query('status').optional(),
		query('startDate').optional(),
		query('endDate').optional(),
		query()
			.custom((query) => {
				const keys = [
					'pageIndex',
					'pageSize',
					'name',
					'status',
					'startDate',
					'endDate',
				];
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

	GET_EXAM_QUESTIONS: [
		param('examId')
			.not()
			.isEmpty()
			.withMessage('Exam id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid exam id'),
	],

	DELETE_QUESTION: [
		param('questionId')
			.not()
			.isEmpty()
			.withMessage('Question id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid question id'),
	],

	QUESTION_STATUS: [
		param('questionId')
			.not()
			.isEmpty()
			.withMessage('Question id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid question id'),
		body('status')
			.not()
			.isEmpty()
			.withMessage('Status is required')
			.not()
			.isWhitelisted([
				APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
				APP_CONSTANTS.QUESTION_STATUS.INACTIVE,
			])
			.withMessage('Invalid question status'),
	],

	UPDATE_QUESTION: [
		param('questionId')
			.not()
			.isEmpty()
			.withMessage('Question id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid question id'),
		body('question').not().isEmpty().withMessage('Question is required'),
		body('questionMark')
			.not()
			.isEmpty()
			.withMessage('Question mark is required')
			.not()
			.isNumeric()
			.withMessage('Question marks must be numeric'),
		body('examId')
			.not()
			.isEmpty()
			.withMessage('Exam id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid exam id'),
		,
		body('optionsList')
			.not()
			.isEmpty()
			.withMessage('Option list cannot be empty'),
	],

	GET_EXAM_LIST: [
		query('studentId')
			.not()
			.isEmpty()
			.withMessage('Student id is required')
			.isLength({ min: 24, max: 24 })
			.withMessage('Invalid student id'),
	],

	CREATE_STUDENT: [
		body('firstName')
			.not()
			.isEmpty()
			.withMessage('First name is required')
			.isString()
			.withMessage('First name must be string'),
		body('lastName')
			.not()
			.isEmpty()
			.withMessage('Last name is required')
			.isString()
			.withMessage('Last name must be string'),
		body('fatherName')
			.not()
			.isEmpty()
			.withMessage('Father name is required')
			.isString()
			.withMessage('Father name must be string'),
		body('motherName')
			.not()
			.isEmpty()
			.withMessage('Mother name is required')
			.isString()
			.withMessage('Mother name must be string'),
		body('address')
			.not()
			.isEmpty()
			.withMessage('Address is required')
			.isString()
			.withMessage('Address must be string'),
		body('city')
			.not()
			.isEmpty()
			.withMessage('City is required')
			.isString()
			.withMessage('City must be string'),
		body('state')
			.not()
			.isEmpty()
			.withMessage('State is required')
			.isString()
			.withMessage('State must be string'),
		body('email')
			.not()
			.isEmpty()
			.withMessage('Email is required')
			.isString()
			.withMessage('State must be string'),
		body('password')
			.not()
			.isEmpty()
			.withMessage('Password is required')
			.isString()
			.withMessage('Password must be string'),
		body('dob')
			.not()
			.isEmpty()
			.withMessage('Date of birth is required')
			.isNumeric()
			.withMessage('Date of birth must be number'),
		body('gender')
			.not()
			.isEmpty()
			.withMessage('Gender is required')
			.isString()
			.withMessage('Gender must be string'),
		body('studentId')
			.not()
			.isEmpty()
			.withMessage('Student ID is required')
			.isString()
			.withMessage('Student ID must be string'),
		body('mobileNumber')
			.not()
			.isEmpty()
			.withMessage('Mobile number is required')
			.isString()
			.withMessage('Mobile number must be string'),
		body()
			.custom((body) => {
				const keys = [
					'firstName',
					'lastName',
					'fatherName',
					'motherName',
					'address',
					'city',
					'state',
					'email',
					'password',
					'dob',
					'gender',
					'studentId',
					'mobileNumber',
				];
				return Object.keys(body).every((key) => keys.includes(key));
			})
			.withMessage('Some extra parameters are sent'),
	],
};
