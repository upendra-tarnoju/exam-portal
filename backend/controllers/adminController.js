const { adminHandler } = require('../handlers');

const admin = {
	getExaminerDetails: async (req, res) => {
		let queryType = req.query.type;
		let pageIndex = parseInt(req.query.pageIndex);
		let pageSize = parseInt(req.query.pageSize);

		let msg = '';
		if (queryType === 'examinerCount') {
			let examinerCount = await adminHandler.getExaminerCount();
			res.status(200).send(examinerCount);
		} else if (queryType === 'latestExaminer') {
			let latestPendingExaminers = await adminHandler.getLatestPendingExaminers(
				pageIndex,
				pageSize
			);
			res.status(200).send(latestPendingExaminers);
		} else {
			let examiner = await adminHandler.getExaminerDetails(
				queryType,
				pageIndex,
				pageSize
			);
			if (examiner.length === 0) msg = `No ${queryType} examiner found`;
			res.status(200).send({ examiner, msg: msg });
		}
	},

	saveExaminerDetails: async (req, res) => {
		let examinerId = req.body.id;
		let accountStatus = `${req.body.type}d`;
		let data = await adminHandler.approveOrDeclineExaminer(
			examinerId,
			accountStatus
		);
		res.status(200).send(data);
	},

	getDashboardCardDetails: async (req, res) => {
		let data = await adminHandler.getDashboardCardDetails();
		res.status(200).send(data);
	},

	getUnexpiredExamDetails: async (req, res) => {
		let { minDate, maxDate } = req.query;

		let data = await adminHandler.getUnexpiredExamDetails(minDate, maxDate);
		res.status(200).send(data);
	},
};

module.exports = admin;
