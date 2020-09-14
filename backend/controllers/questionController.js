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
};

module.exports = question;
