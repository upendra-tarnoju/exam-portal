const { questionHandler } = require('../handlers');

const question = {
	addNewQuestion: async (req, res) => {
		let questionData = req.body;
		let questionImage = req.file;
		let newQuestion = await questionHandler.addNewQuestion(
			questionData,
			questionImage
		);
		res.status(200).send(newQuestion);
	},
};

module.exports = question;
