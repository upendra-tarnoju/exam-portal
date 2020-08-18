const { examinerHandler } = require('../handlers');

const examiner = {
	updateExaminerDetails: async (req, res) => {
		let userId = req.user._id;
		let examinerDetails = req.body;
		examinerHandler
			.updateExaminerDetails(examinerDetails, userId)
			.then((data, err) => {
				if (err) {
					res.status(400).send({ msg: 'Unexpected error, Try again' });
				} else {
					res.status(200).send({ msg: 'User updated' });
				}
			});
	},
	createCourse: async (req, res) => {
		let userId = req.user._id;
		let courseDetails = req.body;
		examinerHandler
			.createCourse(userId, courseDetails)
			.then((response) => {
				if (response.status === 400) {
					res.status(400).send({ msg: 'Course already existed' });
				} else res.status(200).send({ msg: 'New course created' });
			})
			.catch((err) => {
				res.status(400).send({
					msg: 'Something wrong happened, Try again',
				});
			});
	},
};

module.exports = examiner;
