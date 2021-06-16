const { examHandler } = require('../handlers');
const responseManager = require('../lib/responseManager');

const exam = {
	saveExamDetails: async (req, res) => {
		try {
			let examDetails = req.body;
			let userData = req.user;

			let response = await examHandler.saveExamDetails(examDetails, userData);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	getExamDetails: async (req, res) => {
		try {
			let query = req.query;
			let userDetails = req.user;
			let responseData = await examHandler.getAllExams(query, userDetails);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	updateExamDetails: async (req, res) => {
		try {
			let examDetails = req.body;
			examDetails.examId = req.params.examId;
			let responseData = await examHandler.updateExam(examDetails);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	deleteExam: async (req, res) => {
		try {
			let examDetails = req.query;

			let response = await examHandler.deleteExam(examDetails);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	getParticularExam: async (req, res) => {
		try {
			let params = req.params;
			let userDetails = req.user;
			let response = await examHandler.getParticularExam(params, userDetails);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	validateExamKey: async (req, res) => {
		try {
			let payload = req.body;
			let responseData = await examHandler.validateExamKey(payload);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getSpecificExamQuestionDetails: async (req, res) => {
		try {
			let params = req.params;
			let responseData = await examHandler.getSpecificExamQuestionDetails(
				params
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getExamList: async (req, res) => {
		try {
			let userDetails = req.user;
			let payload = req.query;

			let response = await examHandler.getExamList(payload, userDetails);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},
};

module.exports = exam;
