const bcrypt = require('bcryptjs');
const { users, course, examiner } = require('../models');

let trimObject = (data) => {
	let keys = Object.keys(data);
	for (let i = 0; i < keys.length - 1; i++) {
		data[keys[i]] = data[keys[i]].trim();
	}
	return data;
};

const examiners = {
	updateExaminerDetails: async (details, userId) => {
		let userData = await users
			.update(userId, {
				lastLogin: Date.now(),
				institution: details.collegeName,
			})
			.select({ userDataId: 1 });
		return examiner.update(userData.userDataId, details);
	},

	createCourse: async (userId, courseDetails) => {
		let existingCourse = await course.find(userId, courseDetails.name);
		if (existingCourse.length === 0) {
			courseDetails['examinerId'] = userId;
			courseDetails = trimObject(courseDetails);
			return course.create(courseDetails);
		} else {
			return { status: 400, msg: 'Course name already existed' };
		}
	},

	getCourses: async (userId, pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let courses = await course
			.findByExaminerId(userId)
			.sort({ createdAt: -1 })
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

	updateProfile: async (examinerId, profileData) => {
		let user = await users.findById(examinerId).select({
			password: 1,
		});
		let comparedPassword = await bcrypt.compare(
			profileData.currentPassword,
			user.password
		);
		if (comparedPassword) {
			let salt = bcrypt.genSaltSync(10);
			let hashedPasswod = bcrypt.hashSync(profileData.newPassword, salt);
			await users.update(examinerId, { password: hashedPasswod });
		}
	},
};

module.exports = examiners;
