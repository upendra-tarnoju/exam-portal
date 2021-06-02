const mongoose = require('mongoose');
const exceljs = require('exceljs');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');
const { queries } = require('../db');
const { factories } = require('../factories');
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

	downloadSampleExcelFile: async () => {
		let workbook = new exceljs.Workbook();
		let workSheet = workbook.addWorksheet('Students');
		workSheet.columns = factories.studentExcelFileColumns();
		return workbook;
	},

	uploadStudentFile: async (payload, userDetails) => {
		try {
			let filePath = `${path.dirname(require.main.filename)}\\uploads\\${
				payload.filename
			}`;

			let workbook = xlsx.readFile(filePath);
			let studentDetails = xlsx.utils.sheet_to_json(
				workbook.Sheets[Object.keys(workbook.Sheets)[0]]
			);

			if (studentDetails.length === 0) {
				return {
					status: RESPONSE_MESSAGES.EXCEL_FILE_UPLOAD.EMPTY_FILE.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.EXCEL_FILE_UPLOAD.EMPTY_FILE.MSG },
				};
			} else {
				let validStudentHeaders = factories
					.studentExcelFileColumns()
					.map((data) => data.header);

				let excelFileHeaders = Object.keys(studentDetails[0]);

				if (validStudentHeaders.length < excelFileHeaders.length) {
					return {
						status: RESPONSE_MESSAGES.EXCEL_FILE_UPLOAD.MISSING_KEY.STATUS_CODE,
						data: { msg: RESPONSE_MESSAGES.EXCEL_FILE_UPLOAD.MISSING_KEY.MSG },
					};
				} else {
					for (let header of excelFileHeaders) {
						if (!validStudentHeaders.includes(header)) {
							console.log(header);
							console.log(validStudentHeaders);
							return {
								status:
									RESPONSE_MESSAGES.EXCEL_FILE_UPLOAD.INVALID_KEY.STATUS_CODE,
								data: {
									msg: RESPONSE_MESSAGES.EXCEL_FILE_UPLOAD.INVALID_KEY.MSG,
								},
							};
						}
					}

					for (let student of studentDetails) {
						let userObject = {
							firstName: student['First name'],
							lastName: student['Last name'],
							email: student['Email'],
							password: await factories.generateHashedPassword(
								student['Password'].toString()
							),
							mobileNumber: student['Mobile number'],
							userType: APP_DEFAULTS.ACCOUNT_TYPE.STUDENT,
							status: APP_DEFAULTS.ACCOUNT_STATUS.APPROVED,
							subAdmin: userDetails._id,
						};

						let newUser = await queries.create(Schema.users, userObject);

						let studentObject = {
							userId: newUser._id,
							fatherName: student['Father name'],
							motherName: student['Mother name'],
							dob: student['Date of birth'],
							address: student['Address'],
							studentId: student['Student ID'],
							gender: student['Gender'],
						};

						await queries.create(Schema.student, studentObject);
					}
				}
			}

			fs.unlinkSync(filePath);
			return { status: 200, data: {} };
		} catch (err) {
			throw err;
		}
	},
};

module.exports = subAdmin;
