const { adminHandler } = require('../handlers');

const admin = {
	getExaminerDetails: async (req, res) => {
		let queryType = req.query.type;
		let pageIndex = parseInt(req.query.pageIndex);
		let pageSize = parseInt(req.query.pageSize);
		let msg = '';
		if (queryType !== 'examinerCount') {
			let examiner = await adminHandler.getExaminerDetails(
				queryType,
				pageIndex,
				pageSize
			);
			if (examiner.length === 0) msg = `No ${queryType} examiner found`;
			res.status(200).send({ examiner: examiner, msg: msg });
		} else {
			let examinerCount = await adminHandler.getExaminerCount();
			res.status(200).send(examinerCount);
		}
	},

	saveExaminerDetails: async (req, res) => {
		let examinerId = req.query.id;
		let accountStatus = `${req.query.type}d`;
		let data = await adminHandler.approveOrDeclineExaminer(
			examinerId,
			accountStatus
		);
		res.status(200).send(data);
	},
};

module.exports = admin;
