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
});

module.exports = mongoose.model('student', student);
