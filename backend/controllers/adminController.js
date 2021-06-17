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
			let payload = req.query;
			let userDetails = req.user;

			let responseData = await adminHandler.getExaminerDetails(
				payload,
				userDetails
			);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	approveOrDeclineExaminer: async (req, res) => {
		try {
			let payload = req.body;

			let response = await adminHandler.approveOrDeclineExaminer(payload);
			responseManager.sendSuccessResponse(responseData, res);
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

			let responseData = await adminHandler.updateSubAdminStatus(payload);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = admin;
