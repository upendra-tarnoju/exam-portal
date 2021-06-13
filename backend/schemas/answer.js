const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answers = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	examId: { type: Schema.Types.ObjectId, required: true },
	questionId: { type: Schema.Types.ObjectId, required: true },
	answer: { type: String, required: true },
	correct: { type: Boolean, required: true },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	// status: { type: String, required: true },
});

module.exports = mongoose.model('answers', answers);
