const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const APP_CONSTANTS = require('../config/app-defaults');

const statusEnum = [
	APP_CONSTANTS.ASSIGNED_EXAM_STATUS.ACTIVE,
	APP_CONSTANTS.ASSIGNED_EXAM_STATUS.BLOCKED,
	APP_CONSTANTS.ASSIGNED_EXAM_STATUS.DELETED,
	APP_CONSTANTS.ASSIGNED_EXAM_STATUS.SUBMITTED,
];

const examQuestionMarkings = [
	APP_CONSTANTS.EXAM_QUESTION_MARKINGS.NOT_VISITED,
	APP_CONSTANTS.EXAM_QUESTION_MARKINGS.ATTEMPTED,
	APP_CONSTANTS.EXAM_QUESTION_MARKINGS.NOT_ATTEMPTED,
	APP_CONSTANTS.EXAM_QUESTION_MARKINGS.ATTEMPTED_AND_MARKED_FOR_REVIEW,
	APP_CONSTANTS.EXAM_QUESTION_MARKINGS.NOT_ATTEMPTED_AND_MARKED_FOR_REVIEW,
];

const assignExam = new Schema({
	studentId: { type: Schema.Types.ObjectId, required: true },
	examId: { type: Schema.Types.ObjectId, required: true },
	examinerId: { type: Schema.Types.ObjectId, required: true },
	status: { type: String, enum: statusEnum, default: statusEnum[0] },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	marksObtained: { type: Number, default: 0 },
	attemptedQuestionsCount: { type: Number, default: 0 },
	correctAnswerCount: { type: Number, default: 0 },
	totalQuestions: { type: Number, default: 0 },
	answerMarkings: {
		type: [
			{
				questionId: { type: Schema.Types.ObjectId },
				status: { type: String, enum: examQuestionMarkings },
			},
		],
		default: [],
	},
});

module.exports = mongoose.model('assignexam', assignExam);
