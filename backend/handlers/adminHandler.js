const mongoose = require('mongoose');
const moment = require('moment');
const generatorPassword = require('generate-password');

const { users, exam } = require('../models');
const { sender, transporter } = require('../config/mail');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');
const { queries } = require('../db');
const Schema = require('../schemas');
const { factories } = require('../factories');

const admin = {
	getExaminerDetails: async (payload) => {
		try {
			let pageIndex = parseInt(payload.pageIndex, 10);
			let pageSize = parseInt(payload.pageSize, 10);
			pageIndex = pageIndex * pageSize;

			let options = { lean: true };

			let aggregateArray = [
				{ $match: { userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER } },
				{ $sort: { modifiedDate: -1 } },
				{ $skip: pageIndex },
				{ $limit: pageSize },
				{
					$project: {
						firstName: 1,
						lastName: 1,
						email: 1,
						status: 1,
						createdDate: 1,
					},
				},
			];

			let examinerDetails = await queries.aggregateData(
				Schema.users,
				aggregateArray,
				options
			);

			let conditions = { userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER };

			let count = await queries.countDocuments(Schema.users, conditions);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { examinerDetails, count },
			};
		} catch (err) {
			throw err;
		}
	},

	getExaminerCount: async () => {
		try {
			let examinerData = await users.findByUserType(
				APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER
			);
			return { status: 200, data: examinerData };
		} catch (err) {
			throw err;
		}
	},

	approveOrDeclineExaminer: async (payload) => {
		let query = { _id: mongoose.Types.ObjectId(payload.examinerId) };

		let options = { lean: true, new: true };
		let newPassword = generatorPassword.generate({
			length: 14,
			numbers: true,
			uppercase: true,
		});

		let hashedPassword = factories.generateHashedPassword(newPassword);
		let toUpdate = {
			status: payload.status,
			password: hashedPassword,
			modifiedDate: moment().valueOf(),
		};

		let updatedExaminer = await queries.findAndUpdate(
			Schema.users,
			query,
			toUpdate,
			options
		);

		let mailOptions = {
			to: updatedExaminer.email,
			from: sender,
			subject: 'Examiner confirmation mail',
			text: `Your email id ${updatedExaminer.email} has been ${
				updatedExaminer.status === APP_DEFAULTS.ACCOUNT_STATUS.APPROVED
					? `successfully registered.The password is ${newPassword}`
					: 'declined'
			}  as examiner`,
		};

		transporter.sendMail(mailOptions);

		let response;
		if (updatedExaminer.status === APP_DEFAULTS.ACCOUNT_STATUS.DECLINED) {
			response = RESPONSE_MESSAGES.EXAMINER_STATUS.DECLINED;
		} else {
			response = RESPONSE_MESSAGES.EXAMINER_STATUS.APPROVED;
		}

		return {
			status: response.STATUS_CODE,
			data: { msg: response.MSG },
		};
	},

	getDashboardCardDetails: async () => {
		try {
			let aggregateArray = [
				{ $match: { userType: { $ne: APP_DEFAULTS.ACCOUNT_TYPE.ADMIN } } },
				{ $group: { _id: '$userType', count: { $sum: 1 } } },
			];

			let countDetails = await queries.aggregateData(
				Schema.users,
				aggregateArray,
				{
					lean: true,
				}
			);

			condition = {};
			let totalExams = await queries.countDocuments(Schema.exam, condition);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: {
					totalExaminers: countDetails.length !== 0 ? countDetails[0].count : 0,
					totalExams,
					totalStudents: countDetails.length !== 0 ? countDetails[1].count : 0,
					totalSubAdmin: countDetails.length !== 0 ? countDetails[2].count : 0,
				},
			};
		} catch (err) {
			throw err;
		}
	},

	getUnexpiredExamDetails: async (minDate, maxDate) => {
		let data = await exam.findByExamMonth(minDate, maxDate);
		return data;
	},

	getLatestPendingExaminers: async (pageIndex, pageSize) => {
		try {
			pageIndex = pageIndex * pageSize;
			let pendingExaminers = await users
				.findLatest24HoursExaminers()
				.skip(pageIndex)
				.limit(pageSize);

			let allExaminers = await users.findLatest24HoursExaminers();
			return {
				status: 200,
				data: { count: allExaminers.length, examiners: pendingExaminers },
			};
		} catch (err) {
			throw err;
		}
	},

	getSubAdminList: async (payload) => {
		try {
			let pageIndex = parseInt(payload.pageIndex, 10);
			let pageSize = parseInt(payload.pageSize, 10);
			pageIndex = pageIndex * pageSize;
			let query = { userType: APP_DEFAULTS.ACCOUNT_TYPE.SUB_ADMIN };
			let options = { lean: true, skip: pageIndex, limit: pageSize };
			let projections = {
				firstName: 1,
				lastName: 1,
				mobileNumber: 1,
				collegeId: 1,
				email: 1,
				status: 1,
			};
			let populateOptions = {
				path: 'collegeId',
				select: 'name',
			};

			let subAdminList = await queries.populateData(
				Schema.users,
				query,
				projections,
				options,
				populateOptions
			);

			let count = await queries.countDocuments(Schema.users, query);

			return { status: 200, data: { subAdminList, count } };
		} catch (err) {
			throw err;
		}
	},

	updateSubAdminStatus: async (payload, userDetails) => {
		try {
			let conditions = { _id: mongoose.Types.ObjectId(payload.subAdminId) };
			let options = { lean: true, new: true };
			let toUpdate;

			if (payload.status === APP_DEFAULTS.ACCOUNT_STATUS.APPROVED) {
				toUpdate = {
					status: APP_DEFAULTS.ACCOUNT_STATUS.APPROVED,
					modifiedDate: Date.now(),
				};
			} else if (payload.status === APP_DEFAULTS.ACCOUNT_STATUS.DECLINED) {
				toUpdate = {
					status: APP_DEFAULTS.ACCOUNT_STATUS.DECLINED,
					modifiedDate: Date.now(),
				};
			}

			let updatedSubAdmin = await queries.findAndUpdate(
				Schema.users,
				conditions,
				toUpdate,
				options
			);

			if (updatedSubAdmin) {
				if (updatedSubAdmin.status === APP_DEFAULTS.ACCOUNT_STATUS.APPROVED) {
					let mailOptions = {
						to: updatedSubAdmin.email,
						from: sender,
						subject: 'Sub admin confirmation mail',
						text: `Your email id ${updatedSubAdmin.email} has been approved`,
					};

					transporter.sendMail(mailOptions);

					return {
						response: RESPONSE_MESSAGES.SUB_ADMIN.STATUS_APPROVED,
						finalData: {},
					};
				} else if (
					updatedSubAdmin.status === APP_DEFAULTS.ACCOUNT_STATUS.DECLINED
				) {
					let mailOptions = {
						to: updatedSubAdmin.email,
						from: sender,
						subject: 'Sub admin confirmation mail',
						text: `Your email id ${updatedSubAdmin.email} has been declined`,
					};

					transporter.sendMail(mailOptions);
					return {
						response: RESPONSE_MESSAGES.SUB_ADMIN.STATUS_DECLINED,
						finalData: {},
					};
				}
			} else
				return {
					response: RESPONSE_MESSAGES.SUB_ADMIN.INVALID_ID,
					finalData: {},
				};
		} catch (err) {
			throw err;
		}
	},
};

module.exports = admin;
