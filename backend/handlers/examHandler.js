let { exam } = require('../models');
const bcrypt = require('bcryptjs');

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
		let allExams = await exam.get(userId);
		return allExams;
	},
};

module.exports = exams;
