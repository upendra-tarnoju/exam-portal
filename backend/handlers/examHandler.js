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

	getAllExams: async (userId, pageIndex, sortedBy) => {
		let pageSize = 5;
		pageIndex = pageIndex * pageSize;
		let allExams = await exam
			.get({ examinerId: userId })
			.select({ password: 0 })
			.sort({ [sortedBy]: -1 })
			.skip(pageIndex)
			.limit(pageSize);
		return allExams;
	},

	getExamsLength: async (userId) => {
		let totalExams = await exam.get({ examinerId: userId });
		return totalExams.length;
	},

	getParticularExam: async (examId) => {
		let examDetails = await exam.getById(examId);
		return examDetails[0];
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
			let existingExam = await exam.getById(examId);
			if (existingExam.totalMarks < examDetails.passingMarks) {
				return { status: 400, data: { msg: setErrorMessages(key) } };
			} else {
				updatedExam = await exam
					.update(examId, examDetails)
					.select({ [key]: 1 });
				return { status: 200, data: updatedExam };
			}
		} else if (key === 'startTime' || key === 'endTime') {
			updatedExam = await exam
				.update(examId, examDetails)
				.select({ [key]: 1 });
			return { status: 200, data: updatedExam };
		} else if (key === 'password') {
			let existingExam = await exam
				.getByExamId(examId)
				.select({ password: 1 });
			let passwordStatus = bcrypt.compareSync(
				examDetails.password.current,
				existingExam.password
			);
			if (passwordStatus) {
				let salt = bcrypt.genSaltSync(10);
				let hashedPassword = bcrypt.hashSync(
					examDetails.password.new,
					salt
				);
				await exam
					.update(examId, { password: hashedPassword })
					.select({ _id: 1 });
				return {
					status: 200,
					data: { msg: 'Password changed successfully' },
				};
			} else
				return { status: 400, data: { msg: 'Incorrect current password' } };
		} else if (key === 'courses') {
			updatedExam = await exam.update(examId, {
				course: examDetails.courses.id,
			});
			return { status: 200, data: updatedExam };
		} else if (key === 'duration' && examDetails.duration === '') {
			await exam.deleteDurationById(examId);
			return { status: 200, data: { msg: 'Deleted duration' } };
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
