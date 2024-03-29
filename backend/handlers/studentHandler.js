const mongoose = require('mongoose');
const moment = require('moment');

const { queries } = require('../db');
const Schema = require('../schemas');
const { factories } = require('../factories');
const RESPONSE_MESSAGES = require('../config/response-messages');
const APP_CONSTANTS = require('../config/app-defaults');

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
				{ $skip: pageIndex },
				{ $limit: pageSize },
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
						'examDetails._id': 1,
						'examDetails.examDate': 1,
						'examDetails.course': 1,
						'examDetails.subject': 1,
						'examDetails.totalMarks': 1,
						'examDetails.negativeMarks': 1,
						'examDetails.startTime': 1,
						'examDetails.examCode': 1,
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

	getExamQuestions: async (payload, userDetails) => {
		try {
			let conditions, toUpdate, existingAnswer, allQuestionsMarkings;
			let pageIndex = parseInt(payload.pageIndex, 10);

			let query = {
				$and: [
					{ studentId: mongoose.Types.ObjectId(userDetails._id) },
					{ examId: mongoose.Types.ObjectId(payload.examId) },
				],
			};
			let projections = { status: 1, answerMarkings: 1 };
			let options = { lean: true };
			let assignedExamDetails = await queries.findOne(
				Schema.assignExam,
				query,
				projections,
				options
			);

			if (assignedExamDetails) {
				if (
					assignedExamDetails.status ===
						APP_CONSTANTS.ASSIGNED_EXAM_STATUS.BLOCKED ||
					assignedExamDetails.status ===
						APP_CONSTANTS.ASSIGNED_EXAM_STATUS.DELETED
				) {
					return {
						response: RESPONSE_MESSAGES.EXAM.EXAM_QUESTION.BLOCKED_EXAM,
						finalData: {},
					};
				} else {
					let questionDetailQuery = {
						$and: [
							{ examId: payload.examId },
							{ status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE },
						],
					};

					if (payload.questionId) {
						questionDetailQuery.$and.push({
							_id: mongoose.Types.ObjectId(payload.questionId),
						});
						pageIndex = 0;
					}

					let projections = {
						correctAnswer: 0,
						examId: 0,
						examinerId: 0,
						createdDate: 0,
						modifiedDate: 0,
					};
					let questionDetails = await queries.findOne(
						Schema.question,
						questionDetailQuery,
						projections,
						{ skip: pageIndex, limit: 1, lean: true }
					);

					if (questionDetails) {
						if (assignedExamDetails.answerMarkings.length === 0) {
							let allQuestionQuery = {
								$and: [
									{ examId: mongoose.Types.ObjectId(payload.examId) },
									{ status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE },
								],
							};

							let projections = { _id: 1 };
							let allQuestions = await queries.getData(
								Schema.question,
								allQuestionQuery,
								projections,
								{ lean: true }
							);
							let questionMarkings = [];
							for (let i = 0; i < allQuestions.length; i++) {
								questionMarkings.push({
									questionId: allQuestions[i]._id,
									status:
										questionDetails._id.toString() ===
										allQuestions[i]._id.toString()
											? APP_CONSTANTS.EXAM_QUESTION_MARKINGS.NOT_ATTEMPTED
											: APP_CONSTANTS.EXAM_QUESTION_MARKINGS.NOT_VISITED,
								});
							}
							conditions = {
								$and: [
									{ studentId: mongoose.Types.ObjectId(userDetails._id) },
									{ examId: mongoose.Types.ObjectId(payload.examId) },
								],
							};
							toUpdate = { answerMarkings: questionMarkings };
							let markingOptions = { lean: true, new: true };
							await queries.findAndUpdate(
								Schema.assignExam,
								conditions,
								toUpdate,
								markingOptions
							);
						} else {
							conditions = {
								$and: [
									{ studentId: mongoose.Types.ObjectId(userDetails._id) },
									{ examId: mongoose.Types.ObjectId(payload.examId) },
									{
										'answerMarkings.questionId': mongoose.Types.ObjectId(
											questionDetails._id
										),
										'answerMarkings.status': {
											$nin: [
												APP_CONSTANTS.EXAM_QUESTION_MARKINGS.ATTEMPTED,
												APP_CONSTANTS.EXAM_QUESTION_MARKINGS
													.NOT_ATTEMPTED_AND_MARKED_FOR_REVIEW,
												APP_CONSTANTS.EXAM_QUESTION_MARKINGS
													.ATTEMPTED_AND_MARKED_FOR_REVIEW,
											],
										},
									},
								],
							};
							toUpdate = {
								$set: {
									'answerMarkings.$.status':
										APP_CONSTANTS.EXAM_QUESTION_MARKINGS.NOT_ATTEMPTED,
								},
							};
							let markingOptions = { lean: true, new: true };
							await queries.findAndUpdate(
								Schema.assignExam,
								conditions,
								toUpdate,
								markingOptions
							);
						}

						let existingAnswerQuery = {
							$and: [
								{ questionId: mongoose.Types.ObjectId(questionDetails._id) },
								{ examId: mongoose.Types.ObjectId(payload.examId) },
								{ userId: mongoose.Types.ObjectId(userDetails._id) },
							],
						};
						let existingAnswerProjections = { answer: 1 };
						existingAnswer = await queries.findOne(
							Schema.answers,
							existingAnswerQuery,
							existingAnswerProjections,
							{ lean: true }
						);
					}

					let answerMarkingProjections = {
						answerMarkings: 1,
						windowSwitchAttempts: 1,
					};
					let answerMarkingQuery = {
						$and: [
							{ studentId: mongoose.Types.ObjectId(userDetails._id) },
							{ examId: mongoose.Types.ObjectId(payload.examId) },
						],
					};
					allQuestionsMarkings = await queries.findOne(
						Schema.assignExam,
						answerMarkingQuery,
						answerMarkingProjections,
						{ lean: true }
					);

					let examQuery = { _id: mongoose.Types.ObjectId(payload.examId) };
					let examProjections = { subject: 1, endTime: 1 };
					let examDetails = await queries.findOne(
						Schema.exam,
						examQuery,
						examProjections,
						options
					);

					return {
						response: { STATUS_CODE: 200, MSG: '' },
						finalData: {
							questionDetails,
							existingAnswer,
							allQuestionsMarkings: allQuestionsMarkings.answerMarkings,
							examDetails,
							windowSwitchAttempts: allQuestionsMarkings.windowSwitchAttempts,
						},
					};
				}
			} else {
				return {
					response: RESPONSE_MESSAGES.EXAM.EXAM_QUESTION.INVALID_EXAM_ID,
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
	},

	saveExamQuestionAnswer: async (payload, userDetails) => {
		try {
			let query = { _id: mongoose.Types.ObjectId(payload.questionId) };
			let projections = { _id: 1 };
			let options = { lean: true };
			let questionDetails = await queries.findOne(
				Schema.question,
				query,
				projections,
				options
			);

			query = { _id: mongoose.Types.ObjectId(payload.examId) };
			let examDetails = await queries.findOne(
				Schema.exam,
				query,
				projections,
				options
			);

			if (questionDetails) {
				if (examDetails) {
					query = {
						$and: [
							{ userId: userDetails._id },
							{ examId: payload.examId },
							{ questionId: payload.questionId },
						],
					};
					let existingAnswer = await queries.findOne(
						Schema.answers,
						query,
						projections,
						options
					);

					if (existingAnswer) {
						let condition = {
							_id: mongoose.Types.ObjectId(existingAnswer._id),
						};
						let toUpdate = { answer: payload.answer, status: payload.status };
						await queries.findAndUpdate(
							Schema.answers,
							condition,
							toUpdate,
							options
						);
					} else {
						let newAnswer = {
							userId: userDetails._id,
							examId: payload.examId,
							questionId: payload.questionId,
							answer: payload.answer,
							status: payload.status,
						};

						await queries.create(Schema.answers, newAnswer);
					}

					let conditions = {
						$and: [
							{ studentId: mongoose.Types.ObjectId(userDetails._id) },
							{ examId: mongoose.Types.ObjectId(payload.examId) },
							{
								'answerMarkings.questionId': mongoose.Types.ObjectId(
									payload.questionId
								),
							},
						],
					};

					let toUpdate = {
						$set: {
							'answerMarkings.$.status':
								payload.answer === '' &&
								payload.status === APP_CONSTANTS.STUDENT_ANSWER_STATUS.REVIEW
									? APP_CONSTANTS.EXAM_QUESTION_MARKINGS
											.NOT_ATTEMPTED_AND_MARKED_FOR_REVIEW
									: payload.status ===
											APP_CONSTANTS.STUDENT_ANSWER_STATUS.REVIEW &&
									  payload.answer !== ''
									? APP_CONSTANTS.EXAM_QUESTION_MARKINGS
											.ATTEMPTED_AND_MARKED_FOR_REVIEW
									: APP_CONSTANTS.EXAM_QUESTION_MARKINGS.ATTEMPTED,
						},
					};

					let markingOptions = { lean: true, new: true };

					await queries.findAndUpdate(
						Schema.assignExam,
						conditions,
						toUpdate,
						markingOptions
					);

					return { response: { STATUS_CODE: 200, MSG: '' }, finalData: {} };
				} else {
					return {
						response: RESPONSE_MESSAGES.EXAM.EXAM_QUESTION.INVALID_EXAM_ID,
						finalData: {},
					};
				}
			} else {
				return {
					response: RESPONSE_MESSAGES.EXAM.EXAM_QUESTION.INVALID_QUESTION_ID,
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
	},

	submitExam: async (payload, userDetails) => {
		try {
			let aggregateArray = [
				{
					$match: {
						$and: [
							{ examId: mongoose.Types.ObjectId(payload.examId) },
							{ userId: mongoose.Types.ObjectId(userDetails._id) },
						],
					},
				},
				{
					$lookup: {
						from: 'questions',
						localField: 'questionId',
						foreignField: '_id',
						as: 'question',
					},
				},
				{ $unwind: '$question' },
				{
					$lookup: {
						from: 'exams',
						localField: 'examId',
						foreignField: '_id',
						as: 'exam',
					},
				},
				{ $unwind: '$exam' },
				{
					$project: {
						status: 1,
						answer: 1,
						'question.correctAnswer': 1,
						'question.questionMark': 1,
						'question.optionType': 1,
						'exam.negativeMarks': 1,
					},
				},
			];
			let options = { lean: true };

			let examAnswers = await queries.aggregateData(
				Schema.answers,
				aggregateArray,
				options
			);

			let marksObtained = 0;
			let correctAnswerCount = 0;
			let attemptedQuestionsCount = 0;

			for (let i = 0; i < examAnswers.length; i++) {
				let multiOptAnswer = '';

				if (
					examAnswers[i].status ===
					APP_CONSTANTS.STUDENT_ANSWER_STATUS.ATTEMPTED
				) {
					attemptedQuestionsCount = attemptedQuestionsCount + 1;
				}
				if (
					examAnswers[i].question.optionType ===
					APP_CONSTANTS.OPTION_TYPE.MULTIPLE
				) {
					multiOptAnswer = examAnswers[i].question.correctAnswer
						.join(',')
						.slice(0, -1);

					if (multiOptAnswer === examAnswers[i].answer) {
						correctAnswerCount = correctAnswerCount + 1;
						marksObtained = marksObtained + examAnswers[i].questionMark;
					} else {
						marksObtained = marksObtained - examAnswers[i].exam.negativeMarks;
					}
				} else if (
					examAnswers[i].question.optionType ===
					APP_CONSTANTS.OPTION_TYPE.SINGLE
				) {
					if (
						examAnswers[i].answer === examAnswers[i].question.correctAnswer[0]
					) {
						correctAnswerCount = correctAnswerCount + 1;
						marksObtained =
							marksObtained + examAnswers[i].question.questionMark;
					} else {
						marksObtained = marksObtained - examAnswers[i].exam.negativeMarks;
					}
				}
			}

			let conditions = {
				$and: [
					{ examId: mongoose.Types.ObjectId(payload.examId) },
					{ studentId: mongoose.Types.ObjectId(userDetails._id) },
				],
			};

			let toUpdate = {
				status: APP_CONSTANTS.ASSIGNED_EXAM_STATUS.SUBMITTED,
				marksObtained: marksObtained,
				correctAnswerCount: correctAnswerCount,
				attemptedQuestionsCount: attemptedQuestionsCount,
				modifiedDate: Date.now(),
			};

			let updatedExamDetail = await queries.findAndUpdate(
				Schema.assignExam,
				conditions,
				toUpdate,
				options
			);

			if (updatedExamDetail) {
				return {
					response: RESPONSE_MESSAGES.EXAM.EXAM_QUESTION.SUBMITTED,
					finalData: {},
				};
			} else {
				return {
					response: RESPONSE_MESSAGES.EXAM.EXAM_QUESTION.INVALID_EXAM_ID,
					finalData: {},
				};
			}
		} catch (err) {
			throw err;
		}
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

	updateWindowSwitchAttempts: async (payload, userDetails) => {
		try {
			let conditions = {
				$and: [{ examId: payload.examId }, { studentId: userDetails._id }],
			};
			let toUpdate = { $inc: { windowSwitchAttempts: 1 } };
			let options = { lean: true, new: true };

			let updatedExamDetails = await queries.findAndUpdate(
				Schema.assignExam,
				conditions,
				toUpdate,
				options
			);

			if (updatedExamDetails) {
				let examDetails = {
					windowSwitchAttempts: updatedExamDetails.windowSwitchAttempts,
				};

				return {
					response: { STATUS_CODE: 200, MSG: '' },
					finalData: { examDetails },
				};
			}
		} catch (err) {
			throw err;
		}
	},
};

module.exports = students;
