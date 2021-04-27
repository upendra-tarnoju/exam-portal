const { users, course, examiner } = require('../models');
const { factories } = require('../factories');
const Schemas = require('../schemas');
const { queries } = require('../db');
const RESPONSE_MESSAGES = require('../config/response-messages');

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

	getDefaultCourses: async () => {
		try {
			let query = {};
			let options = { lean: true };
			let projections = { name: 1, description: 1 };

			let courseDetails = await queries.getData(
				Schemas.defaultCourses,
				query,
				projections,
				options
			);

			return { status: 200, data: courseDetails };
		} catch (err) {
			throw err;
		}
	},

	createCourse: async (userDetails, courseDetails) => {
		try {
			let newCourse = {};
			let query = {
				$and: [
					{ examinerId: userDetails.userId, courseId: courseDetails.courseId },
				],
			};
			let options = { lean: true };

			let existingCourse = await queries.findOne(
				Schemas.examinerCourses,
				query,
				{},
				options
			);
			if (!existingCourse) {
				newCourse.courseId = courseDetails.courseId;
				newCourse.examinerId = userDetails._id.toString();
				newCourse.description = courseDetails.description;
				courseDetails = trimObject(newCourse);
				await queries.create(Schemas.examinerCourses, courseDetails);

				return {
					status: RESPONSE_MESSAGES.COURSES.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.COURSES.SUCCESS.MSG },
				};
			} else {
				return {
					status: RESPONSE_MESSAGES.COURSES.DUPLICATE_RESOURCE.STATUS_CODE,
					msg: RESPONSE_MESSAGES.COURSES.DUPLICATE_RESOURCE.MSG,
				};
			}
		} catch (err) {
			throw err;
		}
	},

	getExaminerCourses: async (payload, userData) => {
		try {
			let pageSize = parseInt(payload.pageSize, 10);
			let pageIndex = parseInt(payload.pageIndex, 10) * pageSize;

			let query = { examinerId: userData._id };
			let projections = { createdAt: 1, description: 1 };
			let options = {
				sort: { createdAt: -1 },
				skip: pageIndex,
				limit: pageSize,
				lean: true,
			};
			let collectionOptions = {
				path: 'courseId',
				select: 'name',
			};

			let courseDetails = await queries.populateData(
				Schemas.examinerCourses,
				query,
				projections,
				options,
				collectionOptions
			);

			let totalCourses = await queries.countDocuments(
				Schemas.examinerCourses,
				query
			);

			return { status: 200, data: { courseDetails, totalCourses } };
		} catch (err) {
			throw err;
		}
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
		let comparedPassword = factories.compareHashedPassword(
			profileData.currentPassword,
			user.password
		);
		if (comparedPassword) {
			let hashedPasswod = factories.generateHashedPassword(
				profileData.newPassword
			);
			await users.update(examinerId, { password: hashedPasswod });
			return { status: 200, msg: 'Password updated' };
		} else {
			return { status: 401, msg: 'Incorrect current password' };
		}
	},
};

module.exports = examiners;
