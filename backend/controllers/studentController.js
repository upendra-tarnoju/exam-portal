const { studentHandler } = require('../handlers');
const { responseManager } = require('../lib');

const student = {
	getExamStudentsCount: async (req, res) => {
		try {
			let userDetails = req.user;
			let payload = req.query;
			let responseData = await studentHandler.getExamStudentsCount(
				userDetails,
				payload
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	deallocateStudent: async (req, res) => {
		try {
			let payload = req.params;
			let responseData = await studentHandler.deallocateStudent(payload);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	updateStudent: async (req, res) => {
		try {
			let params = req.params;
			let studentDetails = req.body;
			let responseData = await studentHandler.updateStudent(
				params,
				studentDetails
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getParticularExamStudents: async (req, res) => {
		try {
			let payload = { ...req.params, ...req.query };
			let responseData = await studentHandler.getParticularExamStudents(
				payload
			);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getParticularStudentExamDetails: async (req, res) => {
		try {
			// let studentId = req.user._id;
			let userDetails = req.user;
			let responseData = await studentHandler.getParticularStudentExamDetails(
				userDetails
			);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
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

	blockOrUnblockStudent: async (req, res) => {
		try {
			let params = req.params;
			let payload = req.body;

			let responseData = await studentHandler.blockOrUnblockStudent(
				params,
				payload
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = student;
