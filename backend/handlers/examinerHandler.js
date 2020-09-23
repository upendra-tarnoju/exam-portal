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

	getCourses: async (userId, pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let courses = await course
			.findByExaminerId(userId)
			.skip(pageIndex)
			.limit(pageSize)
			.select({ examinerId: 0, modifiedAt: 0 });
		return courses;
	},

	getAllCourses: async (userId) => {
		let courses = await course
			.findByExaminerId(userId)
			.select({ name: 1, description: 1 });
		return courses;
	},

	getCoursesLength: async (userId) => {
		let courses = await course.findByExaminerId(userId);
		return courses.length;
	},

	updateCourse: async (courseData) => {
		let updatedCourse = await course
			.update(courseData)
			.select({ name: 1, description: 1 });
		return updatedCourse;
	},

	deleteCourse: async (courseId) => {
		let deletedCourse = await course.delete(courseId).select({ _id: 1 });
		return deletedCourse;
	},

	searchCourse: async (name, description, pageIndex, pageSize) => {
		let searchCourse = await course
			.search(name, description)
			.skip(pageIndex)
			.limit(pageSize)
			.select({ name: 1, description: 1 });
		return searchCourse;
	},
};

module.exports = examiner;
