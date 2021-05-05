const moment = require('moment');

let { exam } = require('../models');
let { factories } = require('../factories');
let APP_CONSTANTS = require('../config/app-defaults');
let RESPONSE_MESSAGES = require('../config/response-messages');
const queries = require('../db/queries');
let Schema = require('../schemas');

let setErrorMessages = (key) => {
	if (key === 'examCode') {
		return 'Exam code already existed';
	} else if (key === 'subject') {
		return 'Subject already existed';
	} else if (key === 'passingMarks') {
		return 'Passing marks cannot be greater than total marks';
	}
};

let updatePassingMarks = async (key, examId, examDetails) => {
	let existingExam = await exam.getById(examId);

	if (existingExam.totalMarks < examDetails.passingMarks) {
		return { status: 400, data: { msg: setErrorMessages(key) } };
	} else {
		updatedExam = await exam.update(examId, examDetails).select({ [key]: 1 });
		return { status: 200, data: updatedExam };
	}
};

let updateExamPassword = async (examId, examDetails) => {
	let existingExam = await exam.getByExamId(examId).select({ password: 1 });
	let passwordStatus = factories.compareHashedPassword(
		examDetails.password.current,
		existingExam.password
	);
	if (passwordStatus) {
		let hashedPassword = factories.generateHashedPassword(
			examDetails.password.new
		);
		await exam.update(examId, { password: hashedPassword }).select({ _id: 1 });
		return {
			status: 200,
			data: { msg: 'Password changed successfully' },
		};
	} else return { status: 400, data: { msg: 'Incorrect current password' } };
};

let updateExamCodeAndSubject = async (key, examId, examDetails) => {
	let existingExam = await exam.get(examDetails);
	if (existingExam.length === 0) {
		updatedExam = await exam.update(examId, examDetails).select({ [key]: 1 });
		return { status: 200, data: updatedExam };
	} else {
		return { status: 409, data: { msg: setErrorMessages(key) } };
	}
};

const exams = {
	saveExamDetails: async (examDetails, userData) => {
		try {
			let saveData = {
				subject: examDetails.subject,
				course: examDetails.course,
				examCode: examDetails.examCode,
				password: factories.generateHashedPassword(examDetails.password),
				examinerId: userData._id,
				totalMarks: parseInt(examDetails.totalMarks, 10),
				passingMarks: parseInt(examDetails.passingMarks, 10),
				negativeMarks: examDetails.negativeMarks,
				examDate: moment(examDetails.examDate).valueOf(),
				startTime: moment(examDetails.startTime).valueOf(),
				endTime: moment(examDetails.endTime).valueOf(),
				durationStatus: examDetails.hideDuration
					? APP_CONSTANTS.EXAM_DURATION_STATUS.COMPLETE
					: APP_CONSTANTS.EXAM_DURATION_STATUS.SELECTIVE,
				status: APP_CONSTANTS.EXAM_STATUS.CREATED,
			};

			if (!examDetails.hideDuration) {
				saveData.duration = parseInt(examDetails.duration, 10);
			}

			await queries.create(Schema.exam, saveData);

			return {
				data: { msg: RESPONSE_MESSAGES.EXAM.CREATE.SUCCESS.MSG },
				status: RESPONSE_MESSAGES.EXAM.CREATE.SUCCESS.STATUS_CODE,
			};
		} catch (err) {
			throw err;
		}
	},

	getAllExams: async (payload, userData) => {
		try {
			let query = {
				$and: [
					{ examinerId: userData._id },
					{ status: { $nin: [APP_CONSTANTS.EXAM_STATUS.DELETED] } },
				],
			};
			let projections = { password: 0, modifiedDate: 0, examinerId: 0 };

			let pageSize = parseInt(payload.pageSize, 10);
			let pageIndex = parseInt(payload.pageIndex) * pageSize;
			let options = { lean: true, skip: pageIndex, limit: pageSize };

			let collectionOptions = { path: 'course', select: '_id description' };

			let examDetails = await queries.populateData(
				Schema.exam,
				query,
				projections,
				options,
				collectionOptions
			);

			let examCount = await queries.countDocuments(Schema.exam, query);

			return {
				status: 200,
				data: { examsList: examDetails, count: examCount },
			};
		} catch (err) {
			throw err;
		}
	},

	getExamsLength: async (userId) => {
		let totalExams = await exam.get({ examinerId: userId });
		return totalExams.length;
	},

	getParticularExam: async (payload, userDetails) => {
		try {
			let query = { _id: payload.examId };
			let projections = { password: 0, createdAt: 0 };
			let collectionOptions = [
				{
					path: 'course',
					select: '_id courseId',
					populate: {
						path: 'courseId',
						select: 'name',
						model: 'defaultCourse',
					},
					model: 'examinerCourses',
				},
			];
			let options = { lean: true };

			let examDetails = await queries.populateData(
				Schema.exam,
				query,
				projections,
				options,
				collectionOptions
			);

			query = { examinerId: userDetails._id };
			projections = {};
			options = { lean: true };

			collectionOptions = { path: 'courseId', select: 'name' };

			let examinerCourses = await queries.populateData(
				Schema.examinerCourses,
				query,
				projections,
				options,
				collectionOptions
			);

			return {
				status: 200,
				data: { examDetails: examDetails[0], coursesList: examinerCourses },
			};
		} catch (err) {
			throw err;
		}
	},

	updateExam: async (payload, userDetails) => {
		let conditions = { _id: payload.examId };

		let toUpdate = {};

		let options = {
			new: true,
			fields: { password: 0, modifiedDate: 0, examinerId: 0, status: 0 },
		};

		if (payload.examCode) toUpdate.examCode = payload.examCode;

		if (payload.course) toUpdate.course = payload.course;

		if (payload.subject) toUpdate.subject = payload.subject;

		if (payload.totalMarks) toUpdate.totalMarks = payload.totalMarks;

		if (payload.passingMarks) toUpdate.passingMarks = payload.passingMarks;

		if (payload.negativeMarks || payload.negativeMarks === 0)
			toUpdate.negativeMarks = payload.negativeMarks;

		if (payload.examDate) toUpdate.examDate = payload.examDate;

		if (payload.startTime) toUpdate.startTime = payload.startTime;

		if (payload.endTime) toUpdate.endTime = payload.endTime;

		if (payload.duration) {
			if (payload.hideDuration) {
				toUpdate.durationStatus = APP_CONSTANTS.EXAM_DURATION_STATUS.COMPLETE;
				toUpdate.duration = null;
			} else {
				toUpdate.durationStatus = APP_CONSTANTS.EXAM_DURATION_STATUS.SELECTIVE;
				toUpdate.duration = payload.duration;
			}
		}

		if (payload.currentPassword) {
			let projections = {};
			let examDetails = await queries.findOne(
				Schema.exam,
				conditions,
				projections,
				options
			);

			let passwordStatus = factories.compareHashedPassword(
				payload.currentPassword,
				examDetails.password
			);

			if (passwordStatus) {
				toUpdate.password = factories.generateHashedPassword(
					payload.newPassword
				);
			} else {
				return {
					status: RESPONSE_MESSAGES.EXAM.UPDATE.INVALID_PASSWORD.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.EXAM.UPDATE.INVALID_PASSWORD.MSG },
				};
			}
		}

		let updatedExam = await queries.findAndUpdate(
			Schema.exam,
			conditions,
			toUpdate,
			options
		);

		if (updatedExam) {
			return {
				status: RESPONSE_MESSAGES.EXAM.UPDATE.SUCCESS.STATUS_CODE,
				data: {
					examDetails: updatedExam,
					msg: RESPONSE_MESSAGES.EXAM.UPDATE.SUCCESS.MSG,
				},
			};
		} else {
		}
	},

	deleteExam: async (examDetails) => {
		try {
			let conditions = { _id: examDetails.examId };
			let toUpdate = { status: APP_CONSTANTS.EXAM_STATUS.DELETED };
			let options = { new: true };

			let updatedExam = await queries.findAndUpdate(
				Schema.exam,
				conditions,
				toUpdate,
				options
			);

			if (updatedExam) {
				return {
					status: RESPONSE_MESSAGES.EXAM.DELETE.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.EXAM.DELETE.SUCCESS.MSG },
				};
			} else {
				return {
					status: RESPONSE_MESSAGES.EXAM.DELETE.INVALID_ID.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.EXAM.DELETE.INVALID_ID.MSG },
				};
			}
		} catch (err) {
			throw err;
		}
	},

	validateExamKey: async (examId, examKey) => {
		let examDetails = await exam.getByExamId(examId).select({
			course: 0,
			examCode: 0,
			examinerId: 0,
			examDate: 0,
			createdAt: 0,
		});
		let validatedPassword = factories.compareHashedPassword(
			examKey,
			examDetails.password
		);
		if (validatedPassword) {
			delete examDetails['password'];
			return { status: 200, examDetails };
		} else {
			return { status: 401, msg: 'Incorrect exam key' };
		}
	},
};

module.exports = exams;
