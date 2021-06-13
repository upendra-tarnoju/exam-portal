let csv = require('csvtojson');
const mongoose = require('mongoose');
const moment = require('moment');

let { student, exam, question, answer } = require('../models');
const { queries } = require('../db');
const Schema = require('../schemas');
const { factories } = require('../factories');
const RESPONSE_MESSAGES = require('../config/response-messages');
const APP_CONSTANTS = require('../config/app-defaults');

const getQuestionData = async (examId, pageIndex) => {
	let questionDetails = await question
		.getSpecificData(examId)
		.skip(pageIndex)
		.limit(1)
		.select({ correctAnswer: 0, createdAt: 0, modifiedAt: 0 });
	return questionDetails;
};

const saveCorrectAnswer = async (
	answerDetails,
	questionDetails,
	existingExamAnswers,
	examDetails
) => {
	answerDetails.correct = true;
	if (existingExamAnswers) {
		let previousSavedAnswer = existingExamAnswers.answers.find(
			(answer) => answer.questionId == answerDetails.questionId
		);

		if (previousSavedAnswer) {
			if (!previousSavedAnswer.correct) {
				answerDetails.marks =
					existingExamAnswers.marks +
					examDetails.negativeMarks +
					questionDetails.questionMarks;
				await answer.updateExamMarks(answerDetails);
			}
		} else {
			answerDetails.marks =
				existingExamAnswers.marks + questionDetails.questionMarks;
			await answer.updateExamAnswers(answerDetails);
		}
	} else {
		answerDetails.marks = questionDetails.questionMarks;
		await answer.create(answerDetails);
	}
};

const saveIncorrectAnswer = async (
	answerDetails,
	questionDetails,
	existingExamAnswers,
	examDetails
) => {
	if (existingExamAnswers) {
		let previousSavedAnswer = existingExamAnswers.answers.find(
			(answer) => answer.questionId == answerDetails.questionId
		);
		answerDetails.correct = false;
		if (previousSavedAnswer) {
			if (previousSavedAnswer.correct) {
				answerDetails.marks =
					existingExamAnswers.marks -
					questionDetails.questionMarks -
					examDetails.negativeMarks;
				await answer.updateExamMarks(answerDetails);
			} else {
				answerDetails.marks = existingExamAnswers.marks;
				await answer.updateExamMarks(answerDetails);
			}
		} else {
			answerDetails.marks =
				existingExamAnswers.marks - examDetails.negativeMarks;
			await answer.updateExamAnswers(answerDetails);
		}
	} else {
		answerDetails.correct = false;
		answerDetails.marks = 0 - questionDetails.negativeMarks;
		await answer.create(answerDetails);
	}
};

const students = {
	getExamStudentsCount: async (userDetails, payload) => {
		try {
			let pageIndex = parseInt(payload.pageIndex, 10);
			let pageSize = parseInt(payload.pageSize, 10);
			pageIndex = pageIndex * pageSize;

			let aggregateArray = [
				{ $match: { examinerId: mongoose.Types.ObjectId(userDetails._id) } },
				{
					$lookup: {
						from: 'assignexams',
						localField: '_id',
						foreignField: 'examId',
						as: 'studentDetails',
					},
				},
				{
					$project: {
						count: { $size: '$studentDetails' },
						examCode: 1,
						subject: 1,
						examDate: 1,
						startTime: 1,
					},
				},
			];
			let options = { lean: true };

			let examData = await queries.aggregateData(
				Schema.exam,
				aggregateArray,
				options
			);

			let condition = { examinerId: mongoose.Types.ObjectId(userDetails._id) };

			let examCount = await queries.countDocuments(Schema.exam, condition);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { examData, examCount },
			};
		} catch (err) {
			throw err;
		}
	},

	getStudentsLength: async (examinerId) => {
		let studentData = await student.findByExaminerId(examinerId);
		return studentData.length;
	},

	deallocateStudent: async (payload) => {
		try {
			let conditions = { _id: mongoose.Types.ObjectId(payload.studentId) };
			let toUpdate = {
				$set: { status: APP_CONSTANTS.ASSIGNED_EXAM_STATUS.DELETED },
			};
			let options = { lean: true };

			let deallocatedStudent = await queries.findAndUpdate(
				Schema.assignExam,
				conditions,
				toUpdate,
				options
			);

			if (deallocatedStudent) {
				return {
					response: RESPONSE_MESSAGES.ASSIGN_STUDENT.DELETE.SUCCESS,
					finalData: {},
				};
			} else {
				return {
					response: RESPONSE_MESSAGES.ASSIGN_STUDENT.DELETE.INVALID_ID,
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
	},

	getParticularExamStudents: async (payload) => {
		try {
			let pageIndex = parseInt(payload.pageIndex, 10);
			let pageSize = parseInt(payload.pageSize, 10);
			pageIndex = pageIndex * pageSize;

			let aggregateArray = [
				{
					$match: {
						$and: [
							{ examId: mongoose.Types.ObjectId(payload.examId) },
							{
								status: { $nin: [APP_CONSTANTS.ASSIGNED_EXAM_STATUS.DELETED] },
							},
						],
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'studentId',
						foreignField: '_id',
						as: 'userDetails',
					},
				},
				{ $unwind: '$userDetails' },
				{
					$lookup: {
						from: 'students',
						localField: 'userDetails._id',
						foreignField: 'userId',
						as: 'studentDetails',
					},
				},
				{ $unwind: '$studentDetails' },
				{ $skip: pageIndex },
				{ $limit: pageSize },

				{
					$project: {
						status: 1,
						'userDetails.firstName': 1,
						'userDetails.lastName': 1,
						'userDetails._id': 1,
						'userDetails.email': 1,
						'studentDetails.studentId': 1,
						'studentDetails._id': 1,
					},
				},
			];
			let options = { lean: true };

			let studentsList = await queries.aggregateData(
				Schema.assignExam,
				aggregateArray,
				options
			);

			let conditions = {
				$and: [
					{ examId: mongoose.Types.ObjectId(payload.examId) },
					{
						status: { $nin: [APP_CONSTANTS.ASSIGNED_EXAM_STATUS.DELETED] },
					},
				],
			};

			let count = await queries.countDocuments(Schema.assignExam, conditions);

			query = { _id: mongoose.Types.ObjectId(payload.examId) };
			let projections = { examDate: 1, startTime: 1 };

			let examDetails = await queries.findOne(
				Schema.exam,
				query,
				projections,
				options
			);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { studentsList, count, examDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	getParticularStudentExamDetails: async (userDetails) => {
		try {
			let upcomingExams = [];
			let todayExams = [];
			let conductedExams = [];

			let startOfMonth = moment().startOf('month').valueOf();
			let endOfMonth = moment().endOf('month').valueOf();

			let aggregateArray = [
				{ $match: { studentId: userDetails._id } },
				{
					$lookup: {
						from: 'exams',
						let: { examId: '$examId' },
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{ $eq: ['$_id', '$$examId'] },
											{ $gte: ['$examDate', startOfMonth] },
											{ $lte: ['$examDate', endOfMonth] },
										],
									},
								},
							},
						],
						as: 'examDetails',
					},
				},
				{ $unwind: '$examDetails' },
				{
					$project: {
						status: 1,
						'examDetails.examDate': 1,
						'examDetails.course': 1,
						'examDetails.subject': 1,
						'examDetails.totalMarks': 1,
						'examDetails.negativeMarks': 1,
						'examDetails.startTime': 1,
					},
				},
			];

			let populateOptions = [
				{
					path: 'examDetails.course',
					populate: {
						path: 'courseId',
						select: 'name',
						model: 'defaultCourse',
					},
					select: '_id courseId',
					model: 'examinerCourses',
				},
			];

			let userExamDetails = await queries.aggregateDataWithPopulate(
				Schema.assignExam,
				aggregateArray,
				populateOptions
			);

			let startOfDay = moment().startOf('day').valueOf();
			let endOfDay = moment().endOf('day').valueOf();

			for (let [index, details] of Object.entries(userExamDetails)) {
				let examDate = details.examDetails.examDate;
				if (examDate >= startOfDay && examDate <= endOfDay) {
					todayExams.push(details);
				} else if (examDate <= startOfDay) {
					conductedExams.push(details);
				} else upcomingExams.push(details);
			}

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { todayExams, conductedExams, upcomingExams },
			};
		} catch (err) {
			throw err;
		}
	},

	getExamQuestions: async (pageIndex, examId, userId) => {
		let studentDetails = await student
			.findStudentExamDetails(userId)
			.select({ exam: 1 });
		let exam = studentDetails.exam.find(
			(item) => item.examId == examId && item.accountStatus == 'enabled'
		);
		if (exam) {
			let totalQuestions = (await question.findByExamId(examId)).length;
			let questionDetails = await getQuestionData(examId, pageIndex);
			return { status: 200, data: { questionDetails, totalQuestions } };
		} else {
			return { status: 405, data: { msg: 'Unexpected error, Try again' } };
		}
	},

	saveExamQuestionAnswer: async (answerDetails) => {
		let questionDetails = await question
			.findById(answerDetails.questionId)
			.select({ correctAnswer: 1, questionMarks: 1 });

		let examDetails = await exam
			.getByExamId(answerDetails.examId)
			.select({ negativeMarks: 1 });

		let existingExamAnswers = await answer
			.find(answerDetails)
			.select({ answers: 1, marks: 1 });

		if (answerDetails.answer === questionDetails.correctAnswer) {
			await saveCorrectAnswer(
				answerDetails,
				questionDetails,
				existingExamAnswers,
				examDetails
			);
		} else {
			await saveIncorrectAnswer(
				answerDetails,
				questionDetails,
				existingExamAnswers,
				examDetails
			);
		}
	},

	submitExam: async (examId, studentId) => {
		let response = await student.updateExamStatus(examId, studentId);
	},

	getAllStudentsList: async (payload, userDetail) => {
		try {
			let query = { _id: mongoose.Types.ObjectId(userDetail._id) };
			let projection = { subAdmin: 1 };
			let options = { lean: true };
			let examinerDetails = await queries.findOne(
				Schema.users,
				query,
				projection,
				options
			);

			let aggregateData = [
				{
					$match: {
						$and: [
							{ subAdmin: examinerDetails.subAdmin },
							{ userType: APP_CONSTANTS.ACCOUNT_TYPE.STUDENT },
							{ status: APP_CONSTANTS.ACCOUNT_STATUS.ACTIVE },
						],
					},
				},
				{
					$lookup: {
						from: 'students',
						localField: '_id',
						foreignField: 'userId',
						as: 'studentData',
					},
				},
				{ $unwind: '$studentData' },
				{ $sort: { 'studentData.studentId': 1 } },
				{
					$project: {
						firstName: 1,
						lastName: 1,
						image: 1,
						'studentData.studentId': 1,
						'studentData.dob': 1,
					},
				},
			];

			let studentsList = await queries.aggregateData(
				Schema.users,
				aggregateData,
				options
			);

			query = { _id: mongoose.Types.ObjectId(payload.examId) };
			projection = { examCode: 1, subject: 1 };
			let examDetails = await queries.findOne(
				Schema.exam,
				queries,
				projection,
				options
			);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { studentsList, examDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	assignStudents: async (payload, userDetails) => {
		try {
			let selectedStudents = payload.selectedStudents;
			for (let studentId of selectedStudents) {
				let query = {
					$and: [
						{ examinerId: mongoose.Types.ObjectId(userDetails._id) },
						{ examId: mongoose.Types.ObjectId(payload.examId) },
						{ studentId: mongoose.Types.ObjectId(studentId) },
					],
				};

				let projections = { _id: 1 };
				let options = { lean: true };

				let assignedStudent = await queries.findOne(
					Schema.assignExam,
					query,
					projections,
					options
				);

				if (!assignedStudent) {
					let data = {
						examinerId: userDetails._id,
						examId: payload.examId,
						studentId,
					};
					await queries.create(Schema.assignExam, data);
				}
			}

			return {
				response: RESPONSE_MESSAGES.ASSIGN_STUDENT.SUCCESS,
				finalData: {},
			};
		} catch (err) {
			throw err;
		}
	},

	updateStudent: async (params, studentDetails) => {
		try {
			let condition = { _id: mongoose.Types.ObjectId(params.studentId) };
			let projections = { password: 1 };
			let options = { lean: true };

			let existingUser = await queries.findOne(
				Schema.users,
				condition,
				projections,
				options
			);

			if (existingUser) {
				let hashedPassword = factories.generateHashedPassword(
					studentDetails.new
				);

				let toUpdate = { password: hashedPassword, modifiedDate: Date.now() };

				await queries.findAndUpdate(Schema.users, condition, toUpdate, options);

				return {
					response: RESPONSE_MESSAGES.STUDENT.UPDATE.PASSWORD,
					finalData: {},
				};
			} else {
				return {
					response: RESPONSE_MESSAGES.STUDENT.INVALID_STUDENT_ID,
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
	},

	blockOrUnblockStudent: async (params, payload) => {
		try {
			let query = {
				$and: [
					{ studentId: mongoose.Types.ObjectId(params.studentId) },
					{ status: { $ne: APP_CONSTANTS.ASSIGNED_EXAM_STATUS.DELETED } },
				],
			};
			let projections = { status: 1 };
			let options = { lean: true };

			let existingAssignedStudent = await queries.findOne(
				Schema.assignExam,
				query,
				projections,
				options
			);

			if (existingAssignedStudent) {
				let toUpdate = {};

				if (payload.status === APP_CONSTANTS.ASSIGNED_EXAM_STATUS.BLOCKED) {
					toUpdate = {
						$set: {
							status: APP_CONSTANTS.ASSIGNED_EXAM_STATUS.BLOCKED,
							modifiedDate: Date.now(),
						},
					};

					await queries.findAndUpdate(
						Schema.assignExam,
						query,
						toUpdate,
						options
					);

					return {
						response: RESPONSE_MESSAGES.STUDENT.BLOCK_OR_UNBLOCK.BLOCK,
						finalData: {},
					};
				} else if (
					payload.status === APP_CONSTANTS.ASSIGNED_EXAM_STATUS.ACTIVE
				) {
					toUpdate = {
						$set: { status: APP_CONSTANTS.ASSIGNED_EXAM_STATUS.ACTIVE },
					};

					await queries.findAndUpdate(
						Schema.assignExam,
						query,
						toUpdate,
						options
					);

					return {
						response: RESPONSE_MESSAGES.STUDENT.BLOCK_OR_UNBLOCK.UNBLOCK,
						finalData: {},
					};
				}
			}
		} catch (err) {
			throw err;
		}
	},
};

module.exports = students;
