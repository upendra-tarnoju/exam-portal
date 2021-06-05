const { subAdminHandler } = require('../handlers');
const { responseManager } = require('../lib');

const subAdmin = {
	getSubAdminExaminers: async (req, res) => {
		try {
			let userDetails = req.user;
			let payload = req.query;
			let response = await subAdminHandler.getSubAdminExaminers(
				payload,
				userDetails
			);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	requestNewExaminer: async (req, res) => {
		try {
			let examinerDetails = req.body;
			let userDetails = req.user;
			let response = await subAdminHandler.requestNewExaminer(
				examinerDetails,
				userDetails
			);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	removeExaminers: async (req, res) => {
		try {
			let examinerDetails = req.params;
			let response = await subAdminHandler.removeExaminers(examinerDetails);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	downloadSampleExcelFile: async (req, res) => {
		let filename = 'sample.xlsx';
		let workbook = await subAdminHandler.downloadSampleExcelFile();

		res.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		);

		res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

		workbook.xlsx.write(res).then(() => res.end());
	},

	uploadStudentFile: async (req, res) => {
		try {
			let studentData = req.file;
			let userDetails = req.user;
			let response = await subAdminHandler.uploadStudentFile(
				studentData,
				userDetails
			);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	listStudents: async (req, res) => {
		try {
			let payload = req.query;
			let userDetails = req.user;
			let response = await subAdminHandler.listStudents(payload, userDetails);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	removeStudent: async (req, res) => {
		try {
			let payload = req.params;
			let response = await subAdminHandler.removeStudent(payload);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	viewStudent: async (req, res) => {
		try {
			let payload = req.params;
			let responseData = await subAdminHandler.viewStudent(payload);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	updateStudent: async (req, res) => {
		try {
			let params = req.params;
			let studentDetails = req.body;
			let responseData = await subAdminHandler.updateStudent(
				params,
				studentDetails
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = subAdmin;
