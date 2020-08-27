const { examHandler } = require('../handlers');

const exam = {
	saveExamDetails: async (req, res) => {
		let data = req.body;
		let userId = req.user._id;
		examHandler.saveExamDetails(data, userId).then((response) => {
			res.status(200).send({ msg: 'Exam created' });
		});
	},
};

module.exports = exam;
