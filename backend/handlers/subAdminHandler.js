const mongoose = require('mongoose');

const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');
const { queries } = require('../db');
const Schema = require('../schemas');

const subAdmin = {
	getSubAdminExaminers: async (payload, userDetails) => {
		let pageSize = parseInt(payload.pageSize, 10);
		let pageIndex = parseInt(payload.pageIndex, 10) * pageSize;

		try {
			let query = {
				$and: [
					{ userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER },
					{ subAdmin: mongoose.Types.ObjectId(userDetails._id) },
					{ status: { $ne: APP_DEFAULTS.ACCOUNT_STATUS.DELETED } },
				],
			};

			let options = {
				lean: true,
				skip: pageIndex,
				limit: pageSize,
				sort: { createdDate: -1 },
			};
			let projections = {
				firstName: 1,
				lastName: 1,
				email: 1,
				status: 1,
				createdDate: 1,
			};

			let examinerList = await queries.getData(
				Schema.users,
				query,
				projections,
				options
			);

			let count = await queries.countDocuments(Schema.users, query);

			return { status: 200, data: { examinerList, count } };
		} catch (err) {
			throw err;
		}
	},

	requestNewExaminer: async (examinerDetails, userDetails) => {
		try {
			let query = {
				$and: [
					{ email: examinerDetails.email },
					{ userType: APP_DEFAULTS.ACCOUNT_TYPE.SUB_ADMIN },
					{ status: { $ne: APP_DEFAULTS.ACCOUNT_STATUS.DELETED } },
				],
			};
			let options = { lean: true };
			let projections = {};

			let existingUser = await queries.findOne(
				Schema.users,
				query,
				projections,
				options
			);

			let subAdminQuery = {
				_id: mongoose.Types.ObjectId(userDetails._id),
			};

			let subAdminProjections = { collegeId: 1 };

			let subAdminDetails = await queries.findOne(
				Schema.users,
				subAdminQuery,
				subAdminProjections,
				options
			);

			if (!existingUser) {
				examinerDetails.userType = APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER;
				examinerDetails.status = APP_DEFAULTS.ACCOUNT_STATUS.PENDING;
				examinerDetails.subAdmin = userDetails._id;
				examinerDetails.collegeId = subAdminDetails.collegeId;

				await queries.create(Schema.users, examinerDetails);

				return {
					status: RESPONSE_MESSAGES.EXAMINER_SIGNUP.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.EXAMINER_SIGNUP.SUCCESS.MSG },
				};
			} else {
				return {
					status:
						RESPONSE_MESSAGES.EXAMINER_SIGNUP.DUPLICATE_RESOURCE.STATUS_CODE,
					data: {
						msg: RESPONSE_MESSAGES.EXAMINER_SIGNUP.DUPLICATE_RESOURCE.MSG,
					},
				};
			}
		} catch (err) {
			throw err;
		}
	},

	removeExaminers: async (examinerDetails) => {
		try {
			let conditions = { _id: mongoose.Types.ObjectId(examinerDetails.id) };
			let options = { lean: true };
			let toUpdate = { $set: { status: APP_DEFAULTS.ACCOUNT_STATUS.DELETED } };

			let deletedExaminer = await queries.findAndUpdate(
				Schema.users,
				conditions,
				toUpdate,
				options
			);

			if (deletedExaminer) {
				return {
					status: RESPONSE_MESSAGES.REMOVE_EXAMINER.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.REMOVE_EXAMINER.SUCCESS.MSG },
				};
			} else {
				return {
					status: RESPONSE_MESSAGES.REMOVE_EXAMINER.INVALID_ID.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.REMOVE_EXAMINER.INVALID_ID.MSG },
				};
			}
		} catch (err) {
			throw err;
		}
	},
};

module.exports = subAdmin;
