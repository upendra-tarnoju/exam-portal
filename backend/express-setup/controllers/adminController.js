const { adminHandler } = require('../handlers');
const { responseManager } = require('../lib');

const admin = {
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

			let responseData = await adminHandler.approveOrDeclineExaminer(payload);
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
		try {
			let query = req.query;
			let responseData = await adminHandler.getUnexpiredExamDetails(query);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getLatestPendingExaminers: async (req, res) => {
		try {
			let query = req.query;
			let responseData = await adminHandler.getLatestPendingExaminers(query);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getSubAdminList: async (req, res) => {
		try {
			let payload = req.query;
			let responseData = await adminHandler.getSubAdminList(payload);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
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

	getAdminSettings: async (req, res) => {
		try {
			let userDetails = req.user;

			let responseData = await adminHandler.getAdminSettings(userDetails);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	sendEmail: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;

			let responseData = await adminHandler.sendEmail(payload, userDetails);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	updateSettings: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;

			let responseData = await adminHandler.updateSettings(
				payload,
				userDetails
			);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	resetPassword: async (req, res) => {
		try {
			let payload = req.body;
			let userDetails = req.user;

			let responseData = await adminHandler.resetPassword(payload, userDetails);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = admin;
