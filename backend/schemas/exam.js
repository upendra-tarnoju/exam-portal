const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exam = new Schema({
	subject: {
		type: String,
	},
	course: {
		type: String,
	},
	examCode: {
		type: String,
	},
	password: {
		type: String,
	},
	examinerId: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	totalMarks: {
		type: Number,
	},
	passingMarks: {
		type: Number,
	},
	examDate: {
		type: Date,
	},
	startTime: {
		type: Date,
	},
	endTime: {
		type: Date,
	},
	duration: {
		type: Number,
	},
	negativeMarks: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('exam', exam);
