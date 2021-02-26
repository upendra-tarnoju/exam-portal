const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const student = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
	},
	fatherName: {
		type: String,
		lowercase: true,
	},
	motherName: {
		type: String,
		lowercase: true,
	},
	dob: {
		type: Date,
	},
	address: {
		type: String,
	},
	examinerId: {
		type: Schema.Types.ObjectId,
	},
	studentId: {
		type: String,
		uppercase: true,
	},
	gender: {
		type: String,
	},
	exam: [
		{
			examId: {
				type: Schema.Types.ObjectId,
			},
			accountStatus: {
				type: String,
				default: 'enabled',
			},
			submitted: {
				type: Boolean,
				default: false,
			},
		},
	],
});

module.exports = mongoose.model('student', student);
