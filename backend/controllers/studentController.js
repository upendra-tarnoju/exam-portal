const { studentHandler } = require('../handlers');

const student = {
	addNewStudent: (req, res) => {
		let studentData = req.body;
		let examinerId = req.user._id;

		studentData.examinerId = examinerId;
		studentData.accountType = 'student';

		studentHandler.addNewStudent(studentData).then((response) => {
			res.status(200).send(response);
		});
	},
};

module.exports = student;
