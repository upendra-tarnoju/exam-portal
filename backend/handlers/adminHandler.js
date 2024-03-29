const mongoose = require('mongoose');
const moment = require('moment');
const generatorPassword = require('generate-password');

const { sender, transporter } = require('../config/mail');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');
const { queries } = require('../db');
const Schema = require('../schemas');
const { factories } = require('../factories');
const { emailManager } = require('../lib');

const admin = {
	getExaminerDetails: async (payload) => {
		try {
			let pageIndex = parseInt(payload.pageIndex, 10);
			let pageSize = parseInt(payload.pageSize, 10);
			pageIndex = pageIndex * pageSize;

			let options = { lean: true };

			let aggregateArray = [
				{
					$match: { $and: [{ userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER }] },
				},
			];

			if (payload.name) {
				let name = new RegExp(payload.name, 'i');
				aggregateArray[0].$match.$and.push({
					$or: [{ firstName: name }, { lastName: name }],
				});
			}

			if (payload.status) {
				aggregateArray[0].$match.$and.push({ status: payload.status });
			}

			if (payload.email) {
				let email = new RegExp(payload.email, 'i');
				aggregateArray[0].$match.$and.push({ email: email });
			}

			let count = await queries.countDocuments(
				Schema.users,
				aggregateArray[0].$match
			);

			aggregateArray.push(
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
				}
			);

			let examinerDetails = await queries.aggregateData(
				Schema.users,
				aggregateArray,
				options
			);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { examinerDetails, count },
			};
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
			response: response,
			finalData: {},
		};
	},

	getDashboardCardDetails: async () => {
		try {
			let aggregateArray = [
				{ $match: { userType: { $ne: APP_DEFAULTS.ACCOUNT_TYPE.ADMIN } } },
				{ $group: { _id: '$userType', count: { $sum: 1 } } },
			];
			let options = { lean: true };

			let countDetails = await queries.aggregateData(
				Schema.users,
				aggregateArray,
				options
			);

			condition = {};
			let totalExams = await queries.countDocuments(Schema.exam, condition);

			aggregateArray = [
				{ $match: { userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER } },
				{ $group: { _id: '$status', count: { $sum: 1 } } },
				{ $sort: { _id: 1 } },
			];

			let examinerDetails = await queries.aggregateData(
				Schema.users,
				aggregateArray,
				options
			);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: {
					totalExaminers: countDetails.length !== 0 ? countDetails[0].count : 0,
					totalExams,
					totalStudents: countDetails.length !== 0 ? countDetails[1].count : 0,
					totalSubAdmin: countDetails.length !== 0 ? countDetails[2].count : 0,
					examiners: {
						approved: examinerDetails[0].count,
						pending: examinerDetails[1].count,
					},
				},
			};
		} catch (err) {
			throw err;
		}
	},

	getUnexpiredExamDetails: async (payload) => {
		let minDate = parseInt(payload.minDate, 10);
		let maxDate = parseInt(payload.maxDate, 10);
		try {
			let aggregateArray = [
				{
					$match: {
						examDate: { $gte: minDate, $lt: maxDate },
					},
				},
				{
					$group: {
						_id: '$examDate',
						count: { $sum: 1 },
					},
				},
				{ $project: { _id: 0, examDate: '$_id', count: 1 } },
				{ $sort: { examDate: 1 } },
			];
			let options = {};

			let examDetails = await queries.aggregateData(
				Schema.exam,
				aggregateArray,
				options
			);

			return {
				response: { STATUS_CODE: 200, msg: '' },
				finalData: { examDetails },
			};
		} catch (err) {
			throw err;
		}
	},

	getLatestPendingExaminers: async (payload) => {
		try {
			let pageIndex = parseInt(payload.pageIndex, 10);
			let pageSize = parseInt(payload.pageSize, 10);

			pageIndex = pageIndex * pageSize;

			let createdDate = moment().startOf('day').valueOf();

			let aggregateArray = [
				{
					$match: {
						$and: [
							{ userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER },
							{ createdDate: { $gte: createdDate } },
							{ status: APP_DEFAULTS.ACCOUNT_STATUS.PENDING },
						],
					},
				},
				{ $project: { firstName: 1, lastName: 1 } },
				{ $skip: pageIndex },
				{ $limit: pageSize },
			];
			let options = { lean: true };

			let examinerDetails = await queries.aggregateData(
				Schema.users,
				aggregateArray,
				options
			);

			let count = await queries.countDocuments(
				Schema.users,
				aggregateArray[0].$match
			);

			return {
				response: { STATUS_CODE: 200, msg: '' },
				finalData: { count: count, examiners: examinerDetails },
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

			let populateOptions = {
				path: 'collegeId',
				select: 'name',
			};

			let aggregateArray = [
				{
					$match: { $and: [{ userType: APP_DEFAULTS.ACCOUNT_TYPE.SUB_ADMIN }] },
				},
			];

			if (payload.name) {
				let name = new RegExp(payload.name, 'i');
				aggregateArray[0].$match.$and.push({
					$or: [{ firstName: name }, { lastName: name }],
				});
			}

			if (payload.email) {
				let email = new RegExp(payload.email, 'i');
				aggregateArray[0].$match.$and.push({ email: email });
			}

			if (payload.status) {
				aggregateArray[0].$match.$and.push({ status: payload.status });
			}

			let count = await queries.countDocuments(
				Schema.users,
				aggregateArray[0].$match
			);

			aggregateArray.push(
				{ $sort: { createdDate: -1 } },
				{ $skip: pageIndex },
				{ $limit: pageSize }
			);

			let subAdminList = await queries.aggregateDataWithPopulate(
				Schema.users,
				aggregateArray,
				populateOptions
			);

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { subAdminList, count },
			};
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

	getAdminSettings: async (userDetails) => {
		try {
			let aggregateArray = [
				{
					$match: {
						userType: {
							$nin: [
								APP_DEFAULTS.ACCOUNT_TYPE.STUDENT,
								APP_DEFAULTS.ACCOUNT_TYPE.ADMIN,
							],
						},
					},
				},
				{ $sort: { email: 1 } },
				{ $project: { email: 1, userType: 1 } },
			];
			let options = { lean: true };

			let emailAddressDetails = await queries.aggregateData(
				Schema.users,
				aggregateArray,
				options
			);

			let adminSettingsQuery = {
				userId: mongoose.Types.ObjectId(userDetails._id),
			};

			let projections = { key: 1, value: 1 };

			let settingDetails = await queries.getData(
				Schema.setting,
				adminSettingsQuery,
				projections,
				options
			);

			let finalSettings = {};

			for (let i = 0; i < settingDetails.length; i++) {
				finalSettings[settingDetails[i].key] = settingDetails[i].value;
			}

			return {
				response: { STATUS_CODE: 200, MSG: '' },
				finalData: { emailAddressDetails, settings: finalSettings },
			};
		} catch (err) {
			throw err;
		}
	},

	sendEmail: async (payload, userDetails) => {
		try {
			let emailList = [];

			let smtpCredentialsQuery = {
				$and: [{ userId: userDetails._id }, { key: 'smtpCredentials' }],
			};
			let projections = { key: 1, value: 1 };
			let options = { lean: true };

			let smtpCredentials = await queries.findOne(
				Schema.setting,
				smtpCredentialsQuery,
				projections,
				options
			);

			for (let i = 0; i < payload.emailAddress.length; i++) {
				emailList.push(payload.emailAddress[i].email);
			}
			let newMail = {
				sender: userDetails._id,
				receiver: payload.emailAddress.map((data) => {
					return data._id;
				}),
				subject: payload.subject,
				body: payload.emailBody,
			};

			await queries.create(Schema.mail, newMail);

			newMail.receiver = emailList;

			await emailManager.sendEmail(smtpCredentials.value, newMail);

			return {
				response: RESPONSE_MESSAGES.SEND_EMAIL.SUCCESS,
				finalData: {},
			};
		} catch (err) {
			throw err;
		}
	},

	updateSettings: async (payload, userDetails) => {
		try {
			let projections = { _id: 1 };
			let options = { lean: true };
			if (payload.smtpCredentials) {
				let findSettingQuery = {
					$and: [
						{ userId: mongoose.Types.ObjectId(userDetails._id) },
						{ key: 'smtpCredentials' },
					],
				};

				let existingSMTPCredentials = await queries.findOne(
					Schema.setting,
					findSettingQuery,
					projections,
					options
				);

				if (existingSMTPCredentials) {
					let toUpdate = {
						value: payload.smtpCredentials,
						modifiedDate: Date.now(),
					};

					await queries.findAndUpdate(
						Schema.setting,
						findSettingQuery,
						toUpdate,
						options
					);
				} else {
					let newCredentials = {
						key: 'smtpCredentials',
						value: payload.smtpCredentials,
						userId: userDetails._id,
					};
					await queries.create(Schema.setting, newCredentials);
				}
			} else if (payload.firebaseCredentials) {
				let findSettingQuery = {
					$and: [
						{ userId: mongoose.Types.ObjectId(userDetails._id) },
						{ key: 'firebaseCredentials' },
					],
				};

				let existingFirebaseCredentials = await queries.findOne(
					Schema.setting,
					findSettingQuery,
					projections,
					options
				);

				if (existingFirebaseCredentials) {
					let toUpdate = {
						value: payload.firebaseCredentials,
						modifiedDate: Date.now(),
					};

					await queries.findAndUpdate(
						Schema.setting,
						findSettingQuery,
						toUpdate,
						options
					);
				} else {
					let newCredentials = {
						key: 'firebaseCredentials',
						value: payload.firebaseCredentials,
						userId: userDetails._id,
					};
					await queries.create(Schema.setting, newCredentials);
				}
			}
			return {
				response: RESPONSE_MESSAGES.UPDATE_ADMIN_SETTING.SUCCESS,
				finalData: {},
			};
		} catch (err) {
			throw err;
		}
	},

	resetPassword: async (payload, userDetails) => {
		try {
			let hashedPassword = factories.generateHashedPassword(
				payload.newPassword
			);

			let condition = { _id: mongoose.Types.ObjectId(userDetails._id) };
			let toUpdate = { password: hashedPassword, modifiedDate: Date.now() };
			let options = { lean: true };

			await queries.findAndUpdate(Schema.users, condition, toUpdate, options);

			return {
				response: RESPONSE_MESSAGES.RESET_PASSWORD.SUCCESS,
				finalData: {},
			};
		} catch (err) {
			throw err;
		}
	},
};

module.exports = admin;
