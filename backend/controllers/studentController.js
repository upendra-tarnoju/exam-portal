const { studentHandler, examHandler } = require('../handlers');
const examiners = require('../handlers/examinerHandler');

const student = {
	addNewStudent: async (req, res) => {
		let examinerId = req.user._id;
		if (req.file !== undefined) {
			if (req.file.originalname.includes('.csv')) {
				let filePath = req.file.path;
				let examId = req.body.examCode;
				let msg = await studentHandler.uploadStudentFile(
					filePath,
					examId,
					examinerId
				);
				res.status(200).send({ msg });
			} else {
				res.status(400).send({ msg: 'File type is not supported' });
			}
		} else {
			let studentData = req.body;
			studentData.examinerId = examinerId;
			studentData.accountType = 'student';

			let response = await studentHandler.addNewStudent(studentData);
			res.status(response.status).send({ msg: response.msg });
		}
	},

	getAllStudents: async (req, res) => {
		let examinerId = req.user._id;
		let pageQuery = req.query;
		let studentData = await studentHandler.getAllStudents(
			examinerId,
			pageQuery
		);
		let totalExams = await examHandler.getExamsLength(examinerId);

		res.status(200).send({ studentData, totalExams });
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
		} else if ('new' in data) {
			let response = await studentHandler.updateStudentPassword(
				studentId,
				data.new
			);
			res.status(response.status).send(response.msg);
		} else {
			let response = await studentHandler.updateStudentDetails(studentId, data);
			res.status(response.status).send(response.data);
		}
	},

	getParticularExamStudents: async (req, res) => {
		let examId = req.params.examId;
		let studentData = await studentHandler.getParticularExamStudents(examId);
		res.status(200).send(studentData);
	},

	getParticularStudentExamDetails: async (req, res) => {
		let studentId = req.user._id;
		let response = await studentHandler.getParticularStudentExamDetails(
			studentId
		);
		res.status(response.status).send(response.data);
	},

	getParticularExamQuestion: async (req, res) => {
		let pageIndex = parseInt(req.query.pageIndex, 10);
		let examId = req.params.examId;
		let userId = req.user._id;
		let response = await studentHandler.getExamQuestions(
			pageIndex,
			examId,
			userId
		);
		res.status(response.status).send(response.data);
	},
};

module.exports = student;
