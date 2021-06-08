const { studentHandler, examHandler } = require('../handlers');
const { responseManager } = require('../lib');

const student = {
	getExamStudentsCount: async (req, res) => {
		let examinerId = req.user._id;
		let pageQuery = req.query;
		let studentData = await studentHandler.getExamStudentsCount(
			examinerId,
			pageQuery
		);
		let totalExams = await examHandler.getExamsLength(examinerId);

		res.status(200).send({ studentData, totalExams });
	},

	deleteStudent: async (req, res) => {
		let studentId = req.params.studentId;
		let response = await studentHandler.delete(studentId);
		res.status(response.status).send({ msg: response.msg });
	},

	updateStudent: async (req, res) => {
		let studentId = req.params.studentId;
		let data = req.body;
		if ('accountStatus' in data) {
			let response = await studentHandler.updateStudentAccountStatus(
				studentId,
				data
			);
			res.status(response.status).send({ msg: response.msg });
		} else if ('new' in data) {
			let response = await studentHandler.updateStudentPassword(
				studentId,
				data.new
			);
			res.status(response.status).send(response.msg);
		} else {
			let response = await studentHandler.updateStudentDetails(studentId, data);
			res.status(response.status).send(response.data);
		}
	},

	getParticularExamStudents: async (req, res) => {
		let examId = req.params.examId;
		let studentData = await studentHandler.getParticularExamStudents(examId);
		res.status(200).send(studentData);
	},

	getParticularStudentExamDetails: async (req, res) => {
		let studentId = req.user._id;
		let response = await studentHandler.getParticularStudentExamDetails(
			studentId
		);
		res.status(response.status).send(response.data);
	},

	getParticularExamQuestion: async (req, res) => {
		let pageIndex = parseInt(req.query.pageIndex, 10);
		let examId = req.params.examId;
		let userId = req.user._id;
		let response = await studentHandler.getExamQuestions(
			pageIndex,
			examId,
			userId
		);
		res.status(response.status).send(response.data);
	},

	saveExamQuestionAnswer: async (req, res) => {
		let questionDetails = req.body;

		questionDetails['studentId'] = req.user._id;
		let response = await studentHandler.saveExamQuestionAnswer(questionDetails);
		res.status(200).send();
	},

	submitExam: async (req, res) => {
		let examId = req.params.examId;
		let studentId = req.user.id;
		let response = await studentHandler.submitExam(examId, studentId);
		res.status(200).send();
	},

	getAllStudentsList: async (req, res) => {
		try {
			let userDetail = req.user;
			let payload = req.params;
			let responseData = await studentHandler.getAllStudentsList(
				payload,
				userDetail
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	assignStudents: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let responseData = await studentHandler.assignStudents(
				payload,
				userDetails
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = student;
