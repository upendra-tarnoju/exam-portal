const mongoose = require('mongoose');
const moment = require('moment');
const generatorPassword = require('generate-password');

const { users, student, exam } = require('../models');
const { sender, transporter } = require('../config/mail');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');
const { queries } = require('../db');
const Schema = require('../schemas');
const { factories } = require('../factories');

const admin = {
	getExaminerDetails: async (pageIndex, pageSize) => {
		try {
			pageIndex = pageIndex * pageSize;

			let options = { lean: true };

			let aggregateArray = [
				{ $match: { userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER } },
				{ $sort: { modifiedDate: -1 } },
				{ $skip: pageIndex },
				{ $limit: pageSize },
				{
					$project: {
						firstName: {
							$concat: [
								{ $toUpper: { $substrCP: ['$firstName', 0, 1] } },
								{
									$substrCP: [
										'$firstName',
										1,
										{
											$subtract: [{ $strLenCP: '$firstName' }, 1],
										},
									],
								},
							],
						},
						lastName: {
							$concat: [
								{ $toUpper: { $substrCP: ['$lastName', 0, 1] } },
								{
									$substrCP: [
										'$lastName',
										1,
										{
											$subtract: [{ $strLenCP: '$lastName' }, 1],
										},
									],
								},
							],
						},
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

			return { status: 200, data: { examinerDetails, count: count } };
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
			let criteria = {};
			criteria = { userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER };
			let totalExaminers = await users.countDocuments(criteria);

			criteria = {};
			let totalExams = await exam.countExams(criteria);
			let totalStudents = await student.countStudents(criteria);

			return {
				status: 200,
				data: {
					totalExaminers,
					totalExams,
					totalStudents,
				},
			};
		} catch (err) {
			return { status: 400, data: { err } };
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

	updateSubAdminStatus: async (payload) => {
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
					return {
						status: RESPONSE_MESSAGES.SUB_ADMIN.STATUS_APPROVED.STATUS_CODE,
						data: { msg: RESPONSE_MESSAGES.SUB_ADMIN.STATUS_APPROVED.MSG },
					};
				} else if (
					updatedSubAdmin.status === APP_DEFAULTS.ACCOUNT_STATUS.DECLINED
				) {
					return {
						status: RESPONSE_MESSAGES.SUB_ADMIN.STATUS_DECLINED.STATUS_CODE,
						data: { msg: RESPONSE_MESSAGES.SUB_ADMIN.STATUS_DECLINED.MSG },
					};
				}
			} else
				return {
					status: RESPONSE_MESSAGES.SUB_ADMIN.INVALID_ID.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.SUB_ADMIN.INVALID_ID.MSG },
				};
		} catch (err) {
			throw err;
		}
	},
};

module.exports = admin;
