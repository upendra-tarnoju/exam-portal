const { examHandler } = require('../handlers');

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
			let userData = req.user;

			let response = await examHandler.getAllExams(query, userData);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	updateExamDetails: async (req, res) => {
		let userDetails = req.user;
		let examDetails = req.body;
		examDetails.examId = req.params.examId;
		let updatedExam = await examHandler.updateExam(examDetails, userDetails);
		res.status(updatedExam.status).send(updatedExam.data);
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
		let examKey = req.query.key;
		let examId = req.params.examId;
		let response = await examHandler.validateExamKey(examId, examKey);
		res
			.status(response.status)
			.send({ msg: response.msg, examDetails: response.examDetails });
	},
};

module.exports = exam;
