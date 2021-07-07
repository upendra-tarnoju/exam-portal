const Joi = require('joi');

const APP_CONSTANTS = require('../config/app-defaults');

module.exports = {
	GET_COURSES: {
		query: Joi.object({
			pageIndex: Joi.number(),
			pageSize: Joi.number(),
			name: Joi.string(),
			startDate: Joi.string(),
			endDate: Joi.string(),
		}),
	},

	SAVE_COURSE: {
		body: Joi.object({
			courseId: Joi.string().required().length(24),
			description: Joi.string().required(),
		}),
	},

	DELETE_COURSE: {
		query: Joi.object({
			courseId: Joi.string().required(),
		}),
	},

	UPDATE_COURSE: {
		body: Joi.object({
			previousCourseId: Joi.string().required().length(24),
			newCourseId: Joi.string().required().length(24),
			description: Joi.string().required(),
		}),
	},

	DELETE_EXAM: {
		query: Joi.object({
			examId: Joi.string().required().length(24),
		}),
	},

	SAVE_EXAM: {
		body: Joi.object({
			subject: Joi.string().required(),
			course: Joi.string().required().length(24),
			examCode: Joi.string().required(),
			password: Joi.string().required(),
			totalMarks: Joi.number().required(),
			passingMarks: Joi.number().required(),
			negativeMarks: Joi.number().required(),
			examDate: Joi.string().required(),
			startTime: Joi.string().required(),
			endTime: Joi.string().required(),
			hideDuration: Joi.boolean().required(),
			duration: Joi.number().optional().allow(''),
		}),
	},

	GET_EXAMS: {
		query: Joi.object({
			pageIndex: Joi.number().required(),
			pageSize: Joi.number().required(),
			name: Joi.string().optional(),
			startDate: Joi.string().optional(),
			endDate: Joi.string().optional(),
			status: Joi.string().valid(
				APP_CONSTANTS.EXAM_STATUS.ACTIVE,
				APP_CONSTANTS.EXAM_STATUS.CREATED,
				APP_CONSTANTS.EXAM_STATUS.DELETED
			),
		}),
	},

	UPDATE_EXAM: {
		params: Joi.object({
			examId: Joi.string().required().length(24),
		}),
		body: Joi.object({
			course: Joi.string().optional(),
			examCode: Joi.string().optional(),
			subject: Joi.string().optional(),
			totalMarks: Joi.number().optional(),
			passingMarks: Joi.number().optional(),
			negativeMarks: Joi.number().optional(),
			examDate: Joi.string().optional(),
			startTime: Joi.string().optional(),
			endTime: Joi.string().optional(),
			duration: Joi.number().optional(),
			hideDuration: Joi.boolean().optional(),
			currentPassword: Joi.string().required(),
		}),
	},

	GET_EXAM_DETAILS: {
		params: Joi.object({
			examId: Joi.string().required().length(24),
		}),
	},

	GET_EXAM_QUESTIONS: {
		params: Joi.object({
			examId: Joi.string().required().length(24),
		}),
	},

	PARTICULAR_QUESTION: {
		params: Joi.object({
			questionId: Joi.string().required().length(24),
		}),
	},

	DELETE_QUESTION: {
		params: Joi.object({
			questionId: Joi.string().required().length(24),
		}),
	},

	EXAM_QUESTION_COUNT: {
		query: Joi.object({
			pageIndex: Joi.number().required(),
			pageSize: Joi.number().required(),
		}),
	},

	STUDENTS_LIST: {
		query: Joi.object({
			examId: Joi.string().required().length(24),
		}),
	},

	QUESTION_STATUS: {
		params: Joi.object({
			questionId: Joi.string().required().length(24),
			status: Joi.string()
				.required()
				.valid(
					APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
					APP_CONSTANTS.QUESTION_STATUS.INACTIVE
				),
		}),
	},

	ASSIGN_STUDENTS: {
		body: Joi.object({
			examId: Joi.string().required().length(24),
			selectedStudents: Joi.array().items(Joi.string().required().length(24)),
		}),
	},

	DEALLOCATE_STUDENT: {
		params: Joi.object({
			studentId: Joi.string().required().length(24),
		}),
	},

	UPDATE_STUDENT: {
		params: Joi.object({
			studentId: Joi.string().required().length(24),
		}),
		body: Joi.object({
			new: Joi.string().required(),
		}),
	},

	PARTICULAR_EXAM_STUDENTS: {
		query: Joi.object({
			pageIndex: Joi.number().required(),
			pageSize: Joi.number().required(),
		}),
	},

	BLOCK_UNBLOCK_STUDENT: {
		body: Joi.object({
			status: Joi.string()
				.required()
				.valid(
					APP_CONSTANTS.ASSIGNED_EXAM_STATUS.ACTIVE,
					APP_CONSTANTS.ASSIGNED_EXAM_STATUS.BLOCKED
				),
		}),
		params: Joi.object({
			studentId: Joi.string().required().length(24),
		}),
	},

	UPDATE_PROFILE: {
		body: Joi.object({
			currentPassword: Joi.string().required(),
			newPassword: Joi.string().required(),
		}),
	},

	UPDATE_QUESTION: {
		params: Joi.object({
			questionId: Joi.string().required().length(24),
		}),
		body: Joi.object({
			question: Joi.string().required(),
			questionMark: Joi.number().required(),
			examId: Joi.string().required().length(24),
		}),
	},

	GET_EXAM_LIST: {
		query: Joi.object({
			studentId: Joi.string().required().length(24),
		}),
	},

	CREATE_STUDENT: {
		body: Joi.object({
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			fatherName: Joi.string().required(),
			motherName: Joi.string().required(),
			address: Joi.string().required(),
			city: Joi.string().required(),
			state: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required(),
			dob: Joi.string().required(),
			gender: Joi.string().required(),
			studentId: Joi.string().required().length(24),
			mobileNumber: Joi.string().required(),
		}),
	},
};
