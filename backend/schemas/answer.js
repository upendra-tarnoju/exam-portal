const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answers = new Schema({
	questionId: {
		type: Schema.Types.ObjectId,
	},
	examId: {
		type: Schema.Types.ObjectId,
	},
	answer: {
		type: String,
	},
	correct: {
		type: Boolean,
	},
});

module.exports = mongoose.model('answers', answers);
