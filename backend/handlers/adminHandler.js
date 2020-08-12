const { users } = require('../models');

const admin = {
	getExaminerDetails: async (type) => {
		let data = await users
			.findByAccountStatus(type)
			.select({ firstName: 1, lastName: 1, email: 1, accountStatus: 1 });
		return data;
	},
};

module.exports = admin;
