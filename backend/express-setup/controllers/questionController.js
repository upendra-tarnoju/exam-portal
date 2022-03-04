const { questionHandler } = require('../handlers');
const { responseManager } = require('../lib');

const question = {
	addNewQuestion: async (req, res) => {
		try {
			let questionDetails = req.body;
			let userDetails = req.user;

			let responseData = await questionHandler.addNewQuestion(
				questionDetails,
				userDetails
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getAllQuestions: async (req, res) => {
		try {
			let params = req.params;
			let responseData = await questionHandler.getExamQuestions(params);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getParticularQuestion: async (req, res) => {
		try {
			let params = req.params;

			let responseData = await questionHandler.getParticularQuestion(params);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	update: async (req, res) => {
		try {
			let params = req.params;
			let questionDetails = req.body;

			let responseData = await questionHandler.update(params, questionDetails);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	delete: async (req, res) => {
		try {
			let params = req.params;

			let response = await questionHandler.delete(params);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	updateQuestionStatus: async (req, res) => {
		try {
			let params = req.params;
			let data = req.body;
			let responseData = await questionHandler.updateQuestionStatus(
				params,
				data
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getQuestionImage: async (req, res) => {
		let params = req.params;

		let response = await questionHandler.getQuestionImage(params);
		response.pipe(res);
	},
};

module.exports = question;
