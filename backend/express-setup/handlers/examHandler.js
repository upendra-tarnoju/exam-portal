const moment = require('moment');
const mongoose = require('mongoose');

let { factories } = require('../factories');
let APP_CONSTANTS = require('../config/app-defaults');
let RESPONSE_MESSAGES = require('../config/response-messages');
const queries = require('../db/queries');
let Schema = require('../../schemas');

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
			let date = {};
			let query = {
				$and: [{ examinerId: userData._id }],
			};

			if (payload.name) {
				query.$and.push({
					$or: [
						{ examCode: { $regex: RegExp(payload.name, 'i') } },
						{ subject: { $regex: RegExp(payload.name, 'i') } },
					],
				});
			}

			if (payload.startDate)
				date.$gte = moment(payload.startDate).startOf('day').valueOf();

			if (payload.endDate)
				date.$lte = moment(payload.endDate).endOf('day').valueOf();

			if (Object.keys(date).length !== 0) query.$and.push({ examDate: date });

			if (payload.status) {
				query.$and.push({
					status: { $in: [payload.status] },
				});
			} else {
				query.$and.push({
					status: { $nin: [APP_CONSTANTS.EXAM_STATUS.DELETED] },
				});
			}

			let projections = { password: 0, modifiedDate: 0, examinerId: 0 };

			let pageSize = parseInt(payload.pageSize, 10);
			let pageIndex = parseInt(payload.pageIndex) * pageSize;
			let options = { lean: true, skip: pageIndex, limit: pageSize };

			let collectionOptions = {
				path: APP_CONSTANTS.DATABASE_MODEL.COURSE,
				select: '_id description',
			};

			let examDetails = await queries.populateData(
				Schema.exam,
				query,
				projections,
				options,
				collectionOptions
			);

			let examCount = await queries.countDocuments(Schema.exam, query);

			query = {
				$and: [
					{ examinerId: userData._id },
					{ status: APP_CONSTANTS.COURSE_STATUS_ENUM.ACTIVE },
				],
			};

			let courseCount = await queries.countDocuments(
				Schema.examinerCourses,
				query
			);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { examsList: examDetails, examCount, courseCount },
			};
		} catch (err) {
			throw err;
		}
	},

	getParticularExam: async (payload, userDetails) => {
		try {
			let query = {
				_id: payload.examId,
			};
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

			query = {
				$and: [
					{ examinerId: userDetails._id },
					{ status: APP_CONSTANTS.COURSE_STATUS_ENUM.ACTIVE },
				],
			};
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

	updateExam: async (payload) => {
		try {
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
					toUpdate.durationStatus =
						APP_CONSTANTS.EXAM_DURATION_STATUS.SELECTIVE;
					toUpdate.duration = payload.duration;
				}
			}

			if (payload.currentPassword) {
				toUpdate.password = factories.generateHashedPassword(
					payload.newPassword
				);
			}

			if (payload.examSwitchingAttempts) {
				toUpdate.examSwitchingAttempts = payload.examSwitchingAttempts;
				toUpdate.updatePreviousQuestion = payload.updatePreviousQuestion;
				toUpdate.shuffleQuestions = payload.shuffleQuestions;
			}

			let updatedExam = await queries.findAndUpdate(
				Schema.exam,
				conditions,
				toUpdate,
				options
			);

			if (updatedExam) {
				return {
					response: RESPONSE_MESSAGES.EXAM.UPDATE.SUCCESS,
					finalData: { examDetails: updatedExam },
				};
			} else {
				return {
					response: RESPONSE_MESSAGES.EXAM.UPDATE.INVALID_ID,
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
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

	validateExamKey: async (payload, userDetails) => {
		try {
			let query = { _id: mongoose.Types.ObjectId(payload.examId) };
			let projections = {
				password: 1,
				totalMarks: 1,
				negativeMarks: 1,
				subject: 1,
				duration: 1,
				startTime: 1,
				endTime: 1,
			};
			let options = { lean: true };

			let examDetails = await queries.findOne(
				Schema.exam,
				query,
				projections,
				options
			);

			if (examDetails) {
				let validatedPassword = factories.compareHashedPassword(
					payload.password,
					examDetails.password
				);

				if (validatedPassword) {
					delete examDetails['password'];

					let assignedExamQuery = {
						$and: [{ examId: payload.examId }, { studentId: userDetails._id }],
					};

					let assignedExamProjections = { status: 1 };

					let assignedExamDetails = await queries.findOne(
						Schema.assignExam,
						assignedExamQuery,
						assignedExamProjections,
						options
					);

					if (
						assignedExamDetails.status ===
						APP_CONSTANTS.ASSIGNED_EXAM_STATUS.SUBMITTED
					) {
						return {
							response: RESPONSE_MESSAGES.EXAM.EXAM_PASSWORD.SUBMITTED_EXAM,
							finalData: {},
						};
					}
					return {
						response: { STATUS_CODE: 200, MSG: '' },
						finalData: { examDetails },
					};
				} else {
					return {
						response: RESPONSE_MESSAGES.EXAM.EXAM_PASSWORD.INVALID_PASSWORD,
						finalData: {},
					};
				}
			} else {
				return {
					response: RESPONSE_MESSAGES.EXAM.EXAM_PASSWORD.INVALID_EXAM_ID,
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
	},

	getSpecificExamQuestionDetails: async (payload) => {
		try {
			let aggregateArray = [
				{ $match: { examId: mongoose.Types.ObjectId(payload.examId) } },
				{ $group: { _id: null, examMarks: { $sum: '$questionMark' } } },
			];

			let questionDetails = await queries.aggregateData(
				Schema.question,
				aggregateArray
			);

			let query = { _id: payload.examId };
			let projections = { examCode: 1, subject: 1, totalMarks: 1 };
			let options = { lean: true };

			let examDetails = await queries.findOne(
				Schema.exam,
				query,
				projections,
				options
			);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: {
					examMarks:
						questionDetails.length !== 0 ? questionDetails[0].examMarks : 0,
					examDetails,
				},
			};
		} catch (err) {
			throw err;
		}
	},

	getExamList: async (payload, userDetails) => {
		try {
			let query = { examinerId: mongoose.Types.ObjectId(userDetails._id) };
			let projections = { examCode: 1, subject: 1 };
			let options = { lean: true };
			let examDetails = await queries.getData(
				Schema.exam,
				query,
				projections,
				options
			);

			query = { _id: mongoose.Types.ObjectId(payload.studentId) };
			projections = { _id: 1 };

			let collectionOptions = {
				path: 'userId',
				select: '_id firstName lastName',
			};

			let studentDetails = await queries.populateData(
				Schema.student,
				query,
				projections,
				options,
				collectionOptions
			);

			if (studentDetails.length !== 0) {
				studentDetails = {
					_id: studentDetails[0]._id,
					userId: studentDetails[0].userId._id,
					firstName: studentDetails[0].userId.firstName,
					lastName: studentDetails[0].userId.lastName,
				};
				return { status: 200, data: { examDetails, studentDetails } };
			} else {
				return {
					status: RESPONSE_MESSAGES.STUDENT.INVALID_STUDENT_ID.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.STUDENT.INVALID_STUDENT_ID.MSG },
				};
			}
		} catch (err) {
			throw err;
		}
	},
};

module.exports = exams;
