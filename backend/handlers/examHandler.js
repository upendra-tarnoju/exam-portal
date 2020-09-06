let { exam } = require('../models');
const bcrypt = require('bcryptjs');
const moment = require('moment');

let checkExistingExamCode = async (examinerId, examCode) => {
	let data = await exam.get({ examCode: examCode });
	if (data.length == 0) return false;
	else return true;
};
let createExamObject = (data, userId) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(data.password, salt);
	let object = {
		subject: data.subject,
		course: data.course,
		examCode: data.examCode,
		password: hash,
		totalMarks: parseInt(data.totalMarks, 10),
		passingMarks: parseInt(data.passingMarks, 10),
		examinerId: userId,
		startTime: new Date(`${data.examDate} ${data.startTime}`),
		endTime: new Date(`${data.examDate} ${data.endTime}`),
		examDate: new Date(data.examDate),
	};
	if (!data.hideDuration) {
		object.duration = data.duration;
	}
	return object;
};

const exams = {
	saveExamDetails: async (examDetails, userId) => {
		let examObject = createExamObject(examDetails, userId);
		return exam.create(examObject);
	},

	getAllExams: async (userId) => {
		let allExams = await exam
			.get({ examinerId: userId })
			.select({ password: 0, createdAt: 0 })
			.sort({ examDate: -1 });
		return allExams;
	},

	getParticularExam: async (examId) => {
		let examDetails = await exam
			.getById(examId)
			.select({ password: 0, createdAt: 0 });
		return examDetails;
	},

	updateExam: async (user, examDetails) => {
		console.log(examDetails);
		examDetails.startTime = new Date(
			`${moment(examDetails.examDate).format('YYYY-MM-DD')} ${
				examDetails.startTime
			}`
		);
		examDetails.endTime = new Date(
			`${moment(examDetails.examDate).format('YYYY-MM-DD')} ${
				examDetails.endTime
			}`
		);

		let examCodeCheck = await checkExistingExamCode(
			examDetails.examinerId,
			examDetails.examCode
		);
		// let updatedExam = await exam
		// 	.update(user, examDetails)
		// 	.select({ password: 0, createdAt: 0 });
		// return updatedExam;
	},

	deleteExam: async (userId, examId) => {
		let deletedExam = await exam.deleteById(examId);
		return deletedExam;
	},
};

module.exports = exams;
