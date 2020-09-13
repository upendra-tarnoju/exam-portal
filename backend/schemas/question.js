const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questions = new Schema({
	examId: {
		type: String,
	},
	question: {
		type: String,
	},
	optionType: {
		type: String,
	},
	correctAnswer: {
		type: String,
	},
	options: {
		type: Array,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	modifiedAt: {
		type: Date,
		default: null,
	},
	// totalOptions: {
	// 	type: Number,
	// },
});

module.exports = mongoose.model('questions', questions);
