const { users } = require('../models');

const admin = {
	getExaminerDetails: async (type, pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let data = await users
			.findByAccountStatus(type)
			.skip(pageIndex)
			.limit(pageSize)
			.select({ firstName: 1, lastName: 1, email: 1, accountStatus: 1 });
		return data;
	},

	getExaminerCount: async () => {
		let examinerCount = {};
		let examinerData = await users.findByAccountType('examiner');
		examinerCount['pending'] = examinerData.filter(
			(data) => data.accountStatus == 'pending'
		).length;
		examinerCount['declined'] = examinerData.filter(
			(data) => data.accountStatus == 'declined'
		).length;
		examinerCount['approved'] = examinerData.filter(
			(data) => data.accountStatus == 'approved'
		).length;
		return examinerCount;
	},

	approveOrDeclineExaminer: async (examinerId, accountStatus) => {
		await users.update(examinerId, accountStatus);
	},
};

module.exports = admin;
