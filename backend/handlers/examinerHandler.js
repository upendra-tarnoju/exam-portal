const { users, course } = require('../models');
const examiner = {
	updateExaminerDetails: async (details, userId) => {
		details['lastLogin'] = Date.now();
		return users.update(userId, details);
	},

	createCourse: async (userId, courseDetails) => {
		let existingCourse = await course.find(userId, courseDetails.name);
		if (existingCourse.length === 0) {
			courseDetails['examinerId'] = userId;
			return course.create(courseDetails);
		} else {
			return { status: 400, msg: 'Course name already existed' };
		}
	},
};

module.exports = examiner;
