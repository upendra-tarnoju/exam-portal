let csv = require('csvtojson');
const mongoose = require('mongoose');
const moment = require('moment');

let { student, users, exam, course, question, answer } = require('../models');
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

	delete: async (studentId) => {
		let data = await student.delete(studentId);
		await users.deleteByUserDataId(data.userId);
		return { status: 200, msg: 'Student deleted successfully' };
	},

	updateStudentAccountStatus: async (studentId, data) => {
		let updatedData = await student.updateStudentAccountStatus(studentId, data);
		if (updatedData) {
			return { status: 200, msg: 'Student account status updated' };
		}
	},

	updateStudentDetails: async (studentId, data) => {
		let updatedPersonalDetails = await users
			.updateByUserDataId(
				{
					userDataId: studentId,
				},
				data
			)
			.select({ firstName: 1, lastName: 1, email: 1, mobileNumber: 1 });
		let updatedOtherDetails = await student
			.updateStudentDetails(studentId, data)
			.select({ userId: 0, examinerId: 0, __v: 0 });
		return {
			status: 200,
			data: {
				personalDetails: updatedPersonalDetails,
				otherDetails: updatedOtherDetails,
				msg: 'Student is updated successfully',
			},
		};
	},

	updateStudentPassword: async (studentId, password) => {
		let updatedData = await users.updateByUserDataId(studentId, { password });
		if (updatedData) {
			return { status: 200, msg: 'Password updated successsfully' };
		}
	},

	getParticularExamStudents: async (examId) => {
		let studentDetails = await student.findStudentsByExamId(examId);
		return studentDetails;
	},

	uploadStudentFile: async (filePath, examId, examinerId) => {
		let csvData = await csv().fromFile(filePath);
		let existingStudent;
		for (let i = 0; i < csvData.length; i++) {
			let studentData = csvData[i];
			studentData.accountType = 'student';
			studentData.examinerId = examinerId;
			let existingUser = await users.findByEmailAndMobileNumber(studentData);
			studentData.password = factories.generateHashedPassword(
				studentData.password
			);
			if (existingUser) {
				existingStudent = await student.findByStudentId(
					existingUser.userDataId,
					studentData
				);
				if (!existingStudent) {
					await student.updateExam(existingUser.userDataId, { examId });
				}
			} else {
				let userData = await users.create(studentData);
				studentData.userId = userData._id;
				let newStudent = await student.create(studentData);
				await users.update(userData._id, { userDataId: newStudent._id });
				await student.updateExam(newStudent._id, {
					examId,
				});
			}
		}
	},

	getParticularStudentExamDetails: async (studentId) => {
		let examList = [];
		let upcomingExams = [];
		let todayExams = [];
		let conductedExams = [];
		let userData = await users.findParticularUserExam(studentId);
		let examData = userData[0].examData.exam;
		for (let i = 0; i < examData.length; i++) {
			let examId = examData[i].examId;
			let examDetail = await exam.getByExamId(examId).select({
				examCode: 1,
				subject: 1,
				course: 1,
				totalMarks: 1,
				negativeMarks: 1,
				examDate: 1,
				startTime: 1,
			});

			let comparedDate = factories.compareExamDate(
				examDetail.examDate,
				examDetail.startTime
			);
			let courseDetails = await course
				.findById(examDetail.course)
				.select({ name: 1 });
			examDetail.course = courseDetails.name;
			examList.push(examDetail);
			if (comparedDate === 'after') {
				upcomingExams.push(examDetail);
			} else if (comparedDate === 'before') {
				conductedExams.push(examDetail);
			} else {
				todayExams.push(examDetail);
			}
		}
		return {
			status: 200,
			data: { todayExams, conductedExams, upcomingExams },
		};
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
};

module.exports = students;
