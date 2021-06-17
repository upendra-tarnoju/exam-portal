const mongoose = require('mongoose');
const moment = require('moment');

const { users, course, examiner } = require('../models');
const { factories } = require('../factories');
const Schemas = require('../schemas');
const { queries } = require('../db');
const RESPONSE_MESSAGES = require('../config/response-messages');
const APP_DEFAULTS = require('../config/app-defaults');

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
					{ examinerId: mongoose.Types.ObjectId(userDetails._id) },
					{ courseId: mongoose.Types.ObjectId(courseDetails.courseId) },
				],
			};
			let projections = {};
			let options = { lean: true };

			let existingCourse = await queries.findOne(
				Schemas.examinerCourses,
				query,
				projections,
				options
			);

			if (!existingCourse) {
				newCourse.courseId = courseDetails.courseId;
				newCourse.examinerId = userDetails._id.toString();
				newCourse.description = courseDetails.description;
				courseDetails = trimObject(newCourse);
				await queries.create(Schemas.examinerCourses, courseDetails);

				return {
					response: RESPONSE_MESSAGES.COURSES.CREATE.SUCCESS,
					finalData: {},
				};
			} else {
				return {
					response: RESPONSE_MESSAGES.COURSES.CREATE.DUPLICATE_RESOURCE,
					finalData: {},
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

			let aggregateOptions = [];

			aggregateOptions.push({
				$match: {
					$and: [
						{ examinerId: userData._id },
						{ status: APP_DEFAULTS.COURSE_STATUS_ENUM.ACTIVE },
					],
				},
			});

			let populateOptions = {
				path: 'courseId',
				select: 'name description',
			};

			if (payload.name) {
				aggregateOptions[0].$match.$and.push({ name: `/${payload.name}/i` });
			}

			let createdDate = {};

			if (payload.startDate) {
				createdDate.$gte = moment(payload.startDate).startOf('day').valueOf();
			}

			if (payload.endDate) {
				createdDate.$lte = moment(payload.endDate).endOf('day').valueOf();
			}

			if (Object.keys(createdDate).length !== 0) {
				aggregateOptions[0].$match.$and.push({ createdDate });
			}

			let totalCourses = await queries.countDocuments(
				Schemas.examinerCourses,
				aggregateOptions[0]['$match']
			);

			aggregateOptions.push(
				{ $project: { createdDate: 1, description: 1, courseId: 1 } },
				{ $sort: { modifiedDate: -1 } },
				{ $skip: pageIndex },
				{ $limit: pageSize }
			);

			let courseDetails = await queries.aggregateDataWithPopulate(
				Schemas.examinerCourses,
				aggregateOptions,
				populateOptions
			);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { courseDetails, totalCourses },
			};
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

	updateCourse: async (courseData, userData) => {
		let conditions = {
			courseId: courseData.previousCourseId,
			examinerId: userData._id,
		};

		let toUpdate = {
			courseId: courseData.newCourseId,
			description: courseData.description,
			modifiedDate: new Date(),
		};
		let options = { new: true };

		let updatedCourse = await queries.findAndUpdate(
			Schemas.examinerCourses,
			conditions,
			toUpdate,
			options
		);

		if (updatedCourse) {
			return {
				status: RESPONSE_MESSAGES.COURSES.UPDATE.SUCCESS.STATUS_CODE,
				data: { msg: RESPONSE_MESSAGES.COURSES.UPDATE.SUCCESS.MSG },
			};
		} else {
			return {
				status: RESPONSE_MESSAGES.COURSES.UPDATE.INVALID_ID.STATUS_CODE,
				data: { msg: RESPONSE_MESSAGES.COURSES.UPDATE.INVALID_ID.MSG },
			};
		}
	},

	deleteCourse: async (payload, userDetails) => {
		try {
			let conditions = {
				_id: payload.courseId,
				examinerId: userDetails._id,
			};
			let toUpdate = { status: APP_DEFAULTS.COURSE_STATUS_ENUM.DELETED };
			let options = { new: true };

			let deletedCourse = await queries.findAndUpdate(
				Schemas.examinerCourses,
				conditions,
				toUpdate,
				options
			);

			if (deletedCourse) {
				return {
					status: RESPONSE_MESSAGES.COURSES.DELETE.SUCCESS.STATUS_CODE,
					data: {
						msg: RESPONSE_MESSAGES.COURSES.DELETE.SUCCESS.MSG,
						courseId: payload.courseId,
					},
				};
			} else {
				return {
					status: RESPONSE_MESSAGES.COURSES.DELETE.INVALID_ID.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.COURSES.DELETE.INVALID_ID.MSG },
				};
			}
		} catch (err) {
			throw err;
		}
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
