const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questions = new Schema({
	examId: { type: Schema.Types.ObjectId, required: true },
	examinerId: { type: Schema.Types.ObjectId, required: true },
	question: { type: String, required: true },
	description: { type: String },
	questionMark: { type: Number, required: true },
	optionType: { type: String, required: true },
	correctAnswer: [{ type: String, required: true }],
	options: [{ key: String, value: String }],
	image: { type: Schema.Types.ObjectId },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	status: { type: String, required: true },
});

module.exports = mongoose.model('questions', questions);
