const { adminHandler } = require('../handlers');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');

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

			// if (type === APP_DEFAULTS.EXAMINER_QUERY_TYPE.LATEST_EXAMINER) {
			// 	let response = await adminHandler.getLatestPendingExaminers(
			// 		pageIndex,
			// 		pageSize
			// 	);
			// 	res.status(response.status).send(response.data);
			// } else {
			// 	let response = await adminHandler.getExaminerDetails(
			// 		type,
			// 		pageIndex,
			// 		pageSize
			// 	);

			// 	if (response.data.length === 0) {
			// 		let response =
			// 			type === APP_DEFAULTS.EXAMINER_QUERY_TYPE.DECLINED
			// 				? RESPONSE_MESSAGES.EXAMINER_COUNT.DECLINED
			// 				: RESPONSE_MESSAGES.EXAMINER_COUNT.PENDING;

			// 		res
			// 			.status(response.STATUS_CODE)
			// 			.send({ msg: response.MSG, examiners: [] });
			// 	} else {
			// 		res.status(response.status).send({ examiners: response.data });
			// 	}
			// }
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
			let response = await adminHandler.getDashboardCardDetails();
			res.status(response.status).send(response.data);
		} catch (err) {
			res.status(400).send(err);
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
