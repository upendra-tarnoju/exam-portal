const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APP_CONSTANTS = require('../config/app-defaults');

const exam = new Schema({
	subject: { type: String, required: true, index: true },
	course: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: APP_CONSTANTS.DATABASE_MODEL.EXAMINER_COURSES,
	},
	examCode: { type: String, required: true, index: true },
	password: { type: String, required: true },
	examinerId: { type: Schema.Types.ObjectId, required: true },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	totalMarks: { type: Number, required: true },
	passingMarks: { type: Number, required: true },
	negativeMarks: { type: Number, required: true },
	examDate: { type: Number, required: true },
	startTime: { type: Number, required: true },
	endTime: { type: Number, required: true },
	duration: { type: Number },
	durationStatus: { type: String, required: true },
	status: { type: String, required: true },
	examSwitchingAttempts: { type: Number, required: true },
	updatePreviousQuestion: { type: Boolean, required: true },
	shuffleQuestions: { type: Boolean, required: true },
});

module.exports = mongoose.model('exam', exam);
