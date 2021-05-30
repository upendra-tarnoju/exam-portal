const { response } = require('express');
const { subAdminHandler } = require('../handlers');

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
};

module.exports = subAdmin;
