const { studentHandler } = require('../handlers');

const student = {
	addNewStudent: async (req, res) => {
		let studentData = req.body;
		let examinerId = req.user._id;

		studentData.examinerId = examinerId;
		studentData.accountType = 'student';

		let response = await studentHandler.addNewStudent(studentData);
		res.status(response.status).send({ msg: response.msg });
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

	deleteStudent: async (req, res) => {
		let studentId = req.params.studentId;
		let response = await studentHandler.delete(studentId);
		res.status(response.status).send({ msg: response.msg });
	},

	updateStudent: async (req, res) => {
		let studentId = req.params.studentId;
		let data = req.body;
		if ('accountStatus' in data) {
			let response = await studentHandler.updateStudentAccountStatus(
				studentId,
				data
			);
			res.status(response.status).send({ msg: response.msg });
		}
	},

	getParticularExamStudents: async (req, res) => {
		let examId = req.params.examId;
		let studentData = await studentHandler.getParticularExamStudents(examId);
		res.status(200).send(studentData);
	},
};

module.exports = student;
