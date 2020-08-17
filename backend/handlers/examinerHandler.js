const { users } = require('../models');
const examiner = {
	updateExaminerDetails: async (details, userId) => {
		details['lastLogin'] = Date.now();
		return users.update(userId, details);
	},
};

module.exports = examiner;
