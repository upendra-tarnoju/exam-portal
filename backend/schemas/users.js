const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const APP_CONSTANTS = require('../config/app-defaults');

const userStatusEnum = [
	APP_CONSTANTS.ACCOUNT_STATUS.APPROVED,
	APP_CONSTANTS.ACCOUNT_STATUS.PENDING,
	APP_CONSTANTS.ACCOUNT_STATUS.DECLINED,
	APP_CONSTANTS.ACCOUNT_STATUS.ACTIVE,
];

const userTypeEnum = [
	APP_CONSTANTS.ACCOUNT_TYPE.ADMIN,
	APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER,
	APP_CONSTANTS.ACCOUNT_TYPE.STUDENT,
];

const users = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		lowercase: true,
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		lowercase: true,
	},
	email: {
		type: String,
		required: [true, 'Email ID is required'],
		validate: {
			validator: (email) => {
				return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
					email
				);
			},
			message: 'Invalid Email ID',
		},
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Minimum length of password should be 6'],
	},
	mobileNumber: {
		type: String,
		required: [true, 'Mobile number is required'],
	},
	userType: {
		type: String,
		required: [true, 'Account type is required'],
		enum: userTypeEnum,
	},
	lastLogin: {
		type: Date,
		default: null,
	},
	status: { type: String, required: true, enum: userStatusEnum },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
});

module.exports = mongoose.model('users', users);
