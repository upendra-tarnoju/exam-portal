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
		try {
			let payload = { ...req.query, ...req.params };
			let userDetails = req.user;

			let responseData = await studentHandler.getExamQuestions(
				payload,
				userDetails
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	saveExamQuestionAnswer: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;
			let responseData = await studentHandler.saveExamQuestionAnswer(
				payload,
				userDetails
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	submitExam: async (req, res) => {
		try {
			let payload = req.params;
			let userDetails = req.user;
			let responseData = await studentHandler.submitExam(payload, userDetails);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getAllStudentsList: async (req, res) => {
		try {
			let userDetail = req.user;
			let payload = req.query;
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
