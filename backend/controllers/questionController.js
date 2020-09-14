const { questionHandler } = require('../handlers');

const question = {
	addNewQuestion: async (req, res) => {
		let questionData = req.body;
		let questionImage = req.file;
		questionHandler
			.addNewQuestion(questionData, questionImage)
			.then((response) => {
				res.status(200).send({ msg: 'Question added successfully' });
			});
	},

	getAllQuestions: async (req, res) => {
		let examId = req.query.examId;
		questionHandler.getAllQuestions(examId).then((response) => {
			res.status(200).send(response);
		});
	},
};

module.exports = question;
