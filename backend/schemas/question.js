const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questions = new Schema({
	examId: {
		type: String,
		required: true,
	},
	question: {
		type: String,
		required: true,
	},
	optionType: {
		type: String,
		required: true,
	},
	correctAnswer: {
		type: String,
		required: true,
	},
	options: [
		{
			name: String,
			value: String,
		},
	],
	image: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	modifiedAt: {
		type: Date,
		default: null,
	},
});

module.exports = mongoose.model('questions', questions);
