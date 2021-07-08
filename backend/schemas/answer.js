const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APP_CONSTANTS = require('../config/app-defaults');

let answerStatusEnum = [
	APP_CONSTANTS.STUDENT_ANSWER_STATUS.ATTEMPTED,
	APP_CONSTANTS.STUDENT_ANSWER_STATUS.CLEARED,
	APP_CONSTANTS.STUDENT_ANSWER_STATUS.REVIEW,
];

const answers = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	examId: { type: Schema.Types.ObjectId, required: true },
	questionId: { type: Schema.Types.ObjectId, required: true },
	answer: { type: String },
	// correct: { type: Boolean, required: true },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	status: { type: String, required: true, enum: answerStatusEnum },
});

module.exports = mongoose.model('answers', answers);
