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
		let pageIndex = req.query.pageIndex;
		let sortedBy = req.query.sort;
		let totalExams = await examHandler.getExamsLength(userId);
		let pageCount = Math.ceil(totalExams / 5);
		examHandler.getAllExams(userId, pageIndex, sortedBy).then((response) => {
			res.status(200).send({ exams: response, pageCount: pageCount });
		});
	},
	updateExamDetails: async (req, res) => {
		let userId = req.user._id;
		let examDetails = req.body;
		let examId = req.params.examId;
		let updatedExam = await examHandler.updateExam(userId, examId, examDetails);
		res.status(updatedExam.status).send(updatedExam.data);
	},
	deleteExam: async (req, res) => {
		let userId = req.user._id;
		let examId = req.query.examId;
		let deletedExam = await examHandler.deleteExam(userId, examId);
		res.status(200).send(deletedExam);
	},

	getParticularExam: async (req, res) => {
		let examId = req.params.examId;
		let exam = await examHandler.getParticularExam(examId);
		exam.courses.id = exam.courses._id;
		delete exam.courses._id;
		res.status(200).send(exam);
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
