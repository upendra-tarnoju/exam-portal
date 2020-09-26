const { questionHandler } = require('../handlers');

const question = {
	addNewQuestion: async (req, res) => {
		let questionData = req.body;
		let questionImage = req.file;
		questionHandler
			.addNewQuestion(questionData, questionImage)
			.then((response) => {
				let data = {
					_id: response._id,
					question: response.question,
				};
				res.status(200).send({
					msg: 'Question added successfully',
					newQuestion: data,
				});
			});
	},

	getAllQuestions: async (req, res) => {
		let examId = req.query.examId;
		let queryType = req.query.queryType;
		if (queryType === 'selective') {
			questionHandler.getSelectiveQuestionData(examId).then((response) => {
				res.status(200).send(response);
			});
		} else {
			questionHandler.getAllQuestionData(examId).then((response) => {
				res.status(200).send(response);
			});
		}
	},

	getParticularQuestion: async (req, res) => {
		let questionId = req.params.questionId;
		questionHandler
			.getParticularQuestion(questionId)
			.then((response) => {
				res.status(200).send(response);
			})
			.catch((error) => {
				console.log(error);
			});
	},

	update: async (req, res) => {
		let questionId = req.params.questionId;
		let questionData = req.body;
		let questionImage = req.file;
		questionHandler
			.update(questionId, questionData, questionImage)
			.then((data) => {
				res.status(200).send(data);
			});
	},

	delete: async (req, res) => {
		let questionId = req.params.questionId;
		questionHandler.delete(questionId).then((data) => {
			res.status(200).send(data);
		});
	},
};

module.exports = question;
