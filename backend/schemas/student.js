const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APP_CONSTANTS = require('../config/app-defaults');

const genderEnum = [
	APP_CONSTANTS.GENDER.MALE,
	APP_CONSTANTS.GENDER.FEMALE,
	APP_CONSTANTS.GENDER.OTHER,
];

const student = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: APP_CONSTANTS.DATABASE_MODEL.USERS,
	},
	fatherName: { type: String, lowercase: true, required: true },
	motherName: { type: String, lowercase: true, required: true },
	dob: { type: Number, required: true },
	address: { type: String, required: true },
	studentId: { type: String, uppercase: true, required: true },
	gender: { type: String, required: true, enum: genderEnum },
	exam: [
		{
			examId: { type: Schema.Types.ObjectId },
			status: { type: String },
			isSubmitted: { type: Boolean, default: false },
		},
	],
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
});

module.exports = mongoose.model('student', student);
