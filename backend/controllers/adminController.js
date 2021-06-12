const { adminHandler } = require('../handlers');
const { responseManager } = require('../lib');

const admin = {
	examinerStatusCount: async (req, res) => {
		try {
			let response = await adminHandler.getExaminerCount();
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	getExaminerDetails: async (req, res) => {
		try {
			let { pageIndex, pageSize } = req.query;
			pageIndex = parseInt(pageIndex);
			pageSize = parseInt(pageSize);
			pageIndex = pageIndex * pageSize;

			let response = await adminHandler.getExaminerDetails(pageIndex, pageSize);

			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	approveOrDeclineExaminer: async (req, res) => {
		try {
			let payload = req.body;

			let response = await adminHandler.approveOrDeclineExaminer(payload);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	getDashboardCardDetails: async (req, res) => {
		try {
			let responseData = await adminHandler.getDashboardCardDetails();

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getUnexpiredExamDetails: async (req, res) => {
		let { minDate, maxDate } = req.query;

		let data = await adminHandler.getUnexpiredExamDetails(minDate, maxDate);
		res.status(200).send(data);
	},

	getSubAdminList: async (req, res) => {
		try {
			let payload = req.query;
			let response = await adminHandler.getSubAdminList(payload);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	updateSubAdminStatus: async (req, res) => {
		try {
			let payload = req.body;
			let response = await adminHandler.updateSubAdminStatus(payload);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},
};

module.exports = admin;
