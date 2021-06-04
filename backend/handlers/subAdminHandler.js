const mongoose = require('mongoose');
const moment = require('moment');
const exceljs = require('exceljs');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');
const { queries } = require('../db');
const { factories } = require('../factories');
const Schema = require('../schemas');

let validateStudent = async (student, index) => {
	let mobileNumberRegex = new RegExp('^[789]d{9}$');

	if ('Student ID' in student) {
		let query = { studentId: student['Student ID'] };
		let projections = {};
		let options = { lean: true };
		let exisitingStudent = await queries.findOne(
			Schema.student,
			query,
			projections,
			options
		);

		if (exisitingStudent) {
			return { row: index + 2, error: 'Student ID already existed' };
		}
	} else {
		return { row: index + 2, error: 'Student ID cannot be empty' };
	}

	if (!('First name' in student)) {
		return { row: index + 2, error: 'First name cannot be empty' };
	}

	if (!('Last name' in student)) {
		return { row: index + 2, error: 'Last name cannot be empty' };
	}

	if (!('Mobile number' in student)) {
		return { row: index + 2, error: 'Mobile number cannot be empty' };
	} else if (mobileNumberRegex.test(student['Mobile number'])) {
		console.log(student['Mobile number']);
		return { row: index + 2, error: 'Invalid mobile number' };
	}

	if (!('Father name' in student)) {
		return { row: index + 2, error: 'Father name cannot be empty' };
	}

	if (!('Mother name' in student)) {
		return { row: index + 2, error: 'Mother name cannot be empty' };
	}

	if (!('Gender' in student)) {
		return { row: index + 2, error: 'Gender cannot be empty' };
	} else if (
		student['Gender'] !== 'male' &&
		student['Gender'] !== 'female' &&
		student['Gender'] !== 'others'
	) {
		return {
			row: index + 2,
			error: 'Valid value for gender is male, female or others',
		};
	}

	if (!('Address' in student)) {
		return { row: index + 2, error: 'Address cannot be empty' };
	}

	if (!('State' in student)) {
		return { row: index + 2, error: 'State cannot be empty' };
	}

	if (!('City' in student)) {
		return { row: index + 2, error: 'City cannot be empty' };
	}

	if (!('Email' in student)) {
		return { row: index + 2, error: 'Email cannot be empty' };
	}

	if (!('Password' in student)) {
		return { row: index + 2, error: 'Password cannot be empty' };
	}

	return {};
};

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
			let fileListError = [];

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
							return {
								status:
									RESPONSE_MESSAGES.EXCEL_FILE_UPLOAD.INVALID_KEY.STATUS_CODE,
								data: {
									msg: RESPONSE_MESSAGES.EXCEL_FILE_UPLOAD.INVALID_KEY.MSG,
								},
							};
						}
					}

					for (let [index, student] of studentDetails.entries()) {
						let validateStatus = await validateStudent(student, index);

						if (Object.keys(validateStatus).length === 0) {
							let userObject = {
								firstName: student['First name'],
								lastName: student['Last name'],
								email: student['Email'],
								password: factories.generateHashedPassword(
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
								dob: moment(student['Date of birth'], 'mm/DD/YYYY').valueOf(),
								address: student['Address'],
								studentId: student['Student ID'],
								gender: student['Gender'],
							};

							await queries.create(Schema.student, studentObject);
						} else fileListError.push(validateStatus);
					}
				}
			}

			fs.unlinkSync(filePath);

			if (fileListError.length === 0) {
				return {
					status: RESPONSE_MESSAGES.STUDENT.FILE_UPLOAD.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.STUDENT.FILE_UPLOAD.SUCCESS.MSG },
				};
			} else {
				return { status: 200, data: { fileListError } };
			}
		} catch (err) {
			throw err;
		}
	},

	listStudents: async (payload, userDetails) => {
		try {
			let pageIndex = parseInt(payload.pageIndex);
			let pageSize = parseInt(payload.pageSize);
			pageIndex = pageIndex * pageSize;

			let aggregateData = [
				{
					$match: {
						$and: [
							{ subAdmin: mongoose.Types.ObjectId(userDetails._id) },
							{ userType: APP_DEFAULTS.ACCOUNT_TYPE.STUDENT },
							{ status: { $ne: APP_DEFAULTS.ACCOUNT_STATUS.DELETED } },
						],
					},
				},
				{
					$lookup: {
						from: 'students',
						localField: '_id',
						foreignField: 'userId',
						as: 'studentsData',
					},
				},
				{ $unwind: '$studentsData' },
				{
					$project: {
						email: 1,
						firstName: 1,
						lastName: 1,
						mobileNumber: 1,
						'studentsData.studentId': 1,
					},
				},
				{ $skip: pageIndex },
				{ $limit: pageSize },
			];

			let studentList = await queries.aggregateData(
				Schema.users,
				aggregateData
			);

			let condition = {
				$and: [
					{ subAdmin: mongoose.Types.ObjectId(userDetails._id) },
					{ userType: APP_DEFAULTS.ACCOUNT_TYPE.STUDENT },
					{ status: { $ne: APP_DEFAULTS.ACCOUNT_STATUS.DELETED } },
				],
			};

			let count = await queries.countDocuments(Schema.users, condition);

			return { status: 200, data: { studentList, count } };
		} catch (err) {
			throw err;
		}
	},

	removeStudent: async (payload) => {
		try {
			let condition = { _id: mongoose.Types.ObjectId(payload.studentId) };
			let toUpdate = {
				$set: {
					status: APP_DEFAULTS.ACCOUNT_STATUS.DELETED,
					modifiedDate: Date.now(),
				},
			};
			let options = { lean: true };

			let deletedStudent = await queries.findAndUpdate(
				Schema.users,
				condition,
				toUpdate,
				options
			);

			if (deletedStudent) {
				return {
					status: RESPONSE_MESSAGES.STUDENT.DELETE.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.STUDENT.DELETE.SUCCESS.MSG },
				};
			} else {
				return {
					status: RESPONSE_MESSAGES.STUDENT.DELETE.INVALID_ID.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.STUDENT.DELETE.INVALID_ID.MSG },
				};
			}
		} catch (err) {
			throw err;
		}
	},
};

module.exports = subAdmin;
