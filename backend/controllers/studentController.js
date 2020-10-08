const { studentHandler } = require('../handlers');

const student = {
	addNewStudent: (req, res) => {
		let studentData = req.body;
		let examinerId = req.user._id;

		studentData.examinerId = examinerId;
		studentData.accountType = 'student';

		studentHandler.addNewStudent(studentData).then((response) => {
			res.status(response.status).send({ msg: response.msg });
		});
	},

	getAllStudents: async (req, res) => {
		let examinerId = req.user._id;
		let pageQuery = req.query;
		let studentData = await studentHandler.getAllStudents(
			examinerId,
			pageQuery
		);
		let totalStudents = await studentHandler.getStudentsLength(examinerId);

		res.status(200).send({ studentData, totalStudents });
	},
};

module.exports = student;
