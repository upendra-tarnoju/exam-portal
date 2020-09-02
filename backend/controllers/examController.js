const { examHandler } = require('../handlers');

const exam = {
	saveExamDetails: async (req, res) => {
		let data = req.body;
		let userId = req.user._id;
		examHandler.saveExamDetails(data, userId).then((response) => {
			delete response.password;
			delete response.createdAt;
			res.status(200).send(response);
		});
	},
	getExamDetails: async (req, res) => {
		let userId = req.user._id;
		examHandler.getAllExams(userId).then((response) => {
			res.status(200).send(response);
		});
	},
	updateExamDetails: async (req, res) => {
		let userId = req.user._id;
		let examDetails = req.query;
		let updatedExam = await examHandler.updateExam(userId, examDetails);
		res.status(200).send(updatedExam);
	},
	deleteExam: async (req, res) => {
		let userId = req.user._id;
		let examId = req.query.examId;
		let deletedExam = await examHandler.deleteExam(userId, examId);
		res.status(200).send(deletedExam);
	},
};

module.exports = exam;
