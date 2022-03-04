const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const APP_CONSTANTS = require('../config/app-defaults');

const userStatusEnum = [
	APP_CONSTANTS.ACCOUNT_STATUS.APPROVED,
	APP_CONSTANTS.ACCOUNT_STATUS.PENDING,
	APP_CONSTANTS.ACCOUNT_STATUS.DECLINED,
	APP_CONSTANTS.ACCOUNT_STATUS.ACTIVE,
	APP_CONSTANTS.ACCOUNT_STATUS.DELETED,
];

const userTypeEnum = [
	APP_CONSTANTS.ACCOUNT_TYPE.ADMIN,
	APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER,
	APP_CONSTANTS.ACCOUNT_TYPE.STUDENT,
	APP_CONSTANTS.ACCOUNT_TYPE.SUB_ADMIN,
];

const users = new Schema({
	firstName: { type: String, required: true, lowercase: true, index: true },
	lastName: { type: String, required: true, lowercase: true, index: true },
	email: { type: String, required: true },
	password: { type: String, default: null },
	mobileNumber: { type: String, required: true },
	userType: { type: String, required: true, enum: userTypeEnum },
	lastLogin: { type: Number, default: null },
	status: { type: String, required: true, enum: userStatusEnum },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	collegeId: { type: Schema.Types.ObjectId, default: null, ref: 'colleges' },
	subAdmin: { type: Schema.Types.ObjectId, default: null },
	image: { type: Schema.Types.ObjectId, default: null },
});

module.exports = mongoose.model('users', users);
