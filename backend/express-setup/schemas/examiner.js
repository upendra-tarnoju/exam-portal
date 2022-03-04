const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examiner = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
	},
	department: {
		type: String,
	},
	designation: {
		type: String,
	},
});

module.exports = mongoose.model('examiner', examiner);
