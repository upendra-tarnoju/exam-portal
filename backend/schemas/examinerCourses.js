const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const APP_CONSTANTS = require('../config/app-defaults');

const courseStatusEnum = [
	APP_CONSTANTS.COURSE_STATUS_ENUM.ACTIVE,
	APP_CONSTANTS.COURSE_STATUS_ENUM.DELETED,
	APP_CONSTANTS.COURSE_STATUS_ENUM.BLOCKED,
];

const examinerCourses = new Schema({
	examinerId: { type: Schema.Types.ObjectId, required: true },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	courseId: { type: Schema.Types.ObjectId, ref: 'defaultCourse' },
	description: { type: String, required: true, trim: true },
	status: {
		type: String,
		default: courseStatusEnum[0],
		enum: courseStatusEnum,
	},
});

module.exports = mongoose.model('examinerCourses', examinerCourses);
