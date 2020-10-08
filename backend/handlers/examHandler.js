let { exam } = require('../models');
const bcrypt = require('bcryptjs');
const moment = require('moment');

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

let setErrorMessages = (key) => {
	if (key === 'examCode') {
		return 'Exam code already existed';
	} else if (key === 'subject') {
		return 'Subject already existed';
	} else if (key === 'passingMarks') {
		return 'Passing marks cannot be greater than total marks';
	}
};

const exams = {
	saveExamDetails: async (examDetails, userId) => {
		let examObject = createExamObject(examDetails, userId);
		return exam.create(examObject);
	},

	getAllExams: async (userId, queryType) => {
		let allExams = await exam
			.get({ examinerId: userId })
			.select(queryType === 'examCode' ? { examCode: 1 } : { password: 0 })
			.sort({ examDate: -1 });
		return allExams;
	},

	getParticularExam: async (examId) => {
		let examDetails = await exam
			.getById(examId)
			.select({ password: 0, createdAt: 0 });
		return examDetails;
	},

	updateExam: async (userId, examId, examDetails) => {
		let key = Object.keys(examDetails)[0];
		examDetails['examinerId'] = userId;
		let updatedExam;
		if (key === 'examCode' || key === 'subject') {
			let existingExam = await exam.get(examDetails);
			if (existingExam.length === 0) {
				updatedExam = await exam
					.update(examId, examDetails)
					.select({ [key]: 1 });
				return { status: 200, data: updatedExam };
			} else {
				return { status: 409, data: { msg: setErrorMessages(key) } };
			}
		} else if (key === 'passingMarks') {
			let existingExam = await exam
				.getById(examId)
				.select({ totalMarks: 1 });
			if (existingExam.totalMarks < examDetails.passingMarks) {
				return { status: 400, data: { msg: setErrorMessages(key) } };
			} else {
				updatedExam = await exam
					.update(examId, examDetails)
					.select({ [key]: 1 });
				return { status: 200, data: updatedExam };
			}
		} else if (key === 'startTime' || key === 'endTime') {
			let existingExam = await exam.getById(examId).select({ examDate: 1 });
			examDetails[key] = new Date(
				`${moment(existingExam.examDate).format('YYYY-MM-DD')} ${
					examDetails[key]
				}`
			);
			updatedExam = await exam
				.update(examId, examDetails)
				.select({ [key]: 1 });
			return { status: 200, data: updatedExam };
		} else if (key === 'password') {
			let existingExam = await exam.getById(examId).select({ password: 1 });
			let passwordStatus = bcrypt.compareSync(
				examDetails.password.current.value,
				existingExam.password
			);
			if (passwordStatus) {
				let salt = bcrypt.genSaltSync(10);
				let hashedPassword = bcrypt.hashSync(
					examDetails.password.new.value,
					salt
				);
				let updatedExam = await exam
					.update(examId, { password: hashedPassword })
					.select({ _id: 1 });
				return {
					status: 200,
					data: { msg: 'Password changed successfully' },
				};
			} else
				return { status: 400, data: { msg: 'Incorrect current password' } };
		} else {
			updatedExam = await exam
				.update(examId, examDetails)
				.select({ [key]: 1 });
			return { status: 200, data: updatedExam };
		}
	},

	deleteExam: async (userId, examId) => {
		let deletedExam = await exam.deleteById(examId);
		return deletedExam;
	},
};

module.exports = exams;
