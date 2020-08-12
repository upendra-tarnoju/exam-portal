const { adminHandler } = require('../handlers');

const admin = {
	getExaminerDetails: async (req, res) => {
		let queryType = req.query.type;
		let msg = '';
		let examiner = await adminHandler.getExaminerDetails(queryType);
		if (examiner.length === 0) msg = `No ${queryType} examiner found`;
		res.status(200).send({ examiner: examiner, msg: msg });
	},
};

module.exports = admin;
