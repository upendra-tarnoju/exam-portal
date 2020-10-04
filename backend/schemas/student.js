const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const student = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
	},
	fatherName: {
		type: String,
	},
	motherName: {
		type: String,
	},
	dob: {
		type: String,
	},
	address: {
		type: String,
	},
	examinerId: {
		type: Schema.Types.ObjectId,
	},
	examId: {
		type: Schema.Types.ObjectId,
	},
});

module.exports = mongoose.model('student', student);
