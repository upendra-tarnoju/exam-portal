const mongoose = require('mongoose');
const moment = require('moment');

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
			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { courseDetails },
			};
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
			let pageIndex = parseInt(payload.pageIndex, 10);

			let aggregateOptions = [];
			let createdDate = {};

			aggregateOptions.push({
				$match: {
					$and: [
						{ examinerId: mongoose.Types.ObjectId(userData._id) },
						{ status: APP_DEFAULTS.COURSE_STATUS_ENUM.ACTIVE },
					],
				},
			});

			aggregateOptions.push({
				$lookup: {
					from: 'defaultcourses',
					let: { courseId: '$courseId' },
					pipeline: [
						{ $match: { $and: [{ $expr: { $eq: ['$$courseId', '$_id'] } }] } },
					],
					as: 'defaultCourses',
				},
			});

			if (payload.startDate) {
				createdDate.$gte = moment(payload.startDate).startOf('day').valueOf();
			}

			if (payload.endDate) {
				createdDate.$lte = moment(payload.endDate).endOf('day').valueOf();
			}

			if (Object.keys(createdDate).length !== 0) {
				aggregateOptions[0].$match.$and.push({ createdDate });
			}

			if (payload.name) {
				let name = new RegExp(payload.name, 'i');
				aggregateOptions[1].$lookup.pipeline[0].$match.$and.push({
					name: name,
				});
			}

			aggregateOptions.push(
				{ $unwind: '$defaultCourses' },
				{ $project: { name: 1, description: 1, 'defaultCourses.name': 1 } },
				{ $sort: { modifiedDate: -1 } },
				{ $skip: pageIndex },
				{ $limit: pageSize }
			);

			let courseDetails = await queries.aggregateData(
				Schemas.examinerCourses,
				aggregateOptions
			);

			let newCourseDetails = [];

			for (let i = 0; i < courseDetails.length; i++) {
				if (Object.keys(courseDetails[i].defaultCourses).length !== 0) {
					newCourseDetails.push(courseDetails[i]);
				}
			}

			let totalCourses = newCourseDetails.length;

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { courseDetails: newCourseDetails, totalCourses },
			};
		} catch (err) {
			throw err;
		}
	},

	updateCourse: async (courseData, userData) => {
		let query = {
			$and: [
				{ courseId: mongoose.Types.ObjectId(courseData.newCourseId) },
				{ examinerId: mongoose.Types.ObjectId(userData._id) },
			],
		};
		let options = { new: true };
		let projections = {};

		let existedCourse = await queries.findOne(
			Schemas.examinerCourses,
			query,
			projections,
			options
		);

		if (existedCourse) {
			return {
				response: RESPONSE_MESSAGES.COURSES.UPDATE.DUPLICATE_RESOURCE,
				finalData: {},
			};
		} else {
			let conditions = {
				courseId: courseData.previousCourseId,
				examinerId: userData._id,
			};

			let toUpdate = {
				courseId: courseData.newCourseId,
				description: courseData.description,
				modifiedDate: new Date(),
			};

			let updatedCourse = await queries.findAndUpdate(
				Schemas.examinerCourses,
				conditions,
				toUpdate,
				options
			);

			if (updatedCourse) {
				return {
					response: RESPONSE_MESSAGES.COURSES.UPDATE.SUCCESS,
					finalData: {},
				};
			} else {
				return {
					response: RESPONSE_MESSAGES.COURSES.UPDATE.INVALID_ID,
					finalData: {},
				};
			}
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

	updateProfile: async (payload, userDetails) => {
		try {
			let hashedPassword = factories.generateHashedPassword(
				payload.newPassword
			);

			let conditions = { _id: userDetails._id };
			let toUpdate = { password: hashedPassword, modifiedDate: Date.now() };
			let options = { lean: true, new: true };

			await queries.findAndUpdate(Schemas.users, conditions, toUpdate, options);
			return {
				response: RESPONSE_MESSAGES.EXAMINER_STATUS.UPDATE_PASSWORD.SUCCESS,
				finalData: {},
			};
		} catch (err) {
			throw err;
		}
	},
};

module.exports = examiners;
