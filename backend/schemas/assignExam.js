const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APP_CONSTANTS = require('../config/app-defaults');

const statusEnum = [
	APP_CONSTANTS.EXAM_STATUS.ACTIVE,
	APP_CONSTANTS.EXAM_STATUS.BLOCKED,
];

const assignExam = new Schema({
	studentId: { type: Schema.Types.ObjectId, required: true },
	examId: { type: Schema.Types.ObjectId, required: true },
	examinerId: { type: Schema.Types.ObjectId, required: true },
	status: { type: String, enum: statusEnum, default: statusEnum[0] },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
});

module.exports = mongoose.model('assignExam', assignExam);
