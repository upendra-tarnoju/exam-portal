const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answers = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
	},
	examId: {
		type: Schema.Types.ObjectId,
	},
	answers: [
		{
			questionId: {
				type: Schema.Types.ObjectId,
			},
			answer: {
				type: String,
			},
			correct: {
				type: Boolean,
			},
		},
	],
	marks: {
		type: Number,
	},
});

module.exports = mongoose.model('answers', answers);
