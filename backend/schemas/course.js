const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const course = new Schema({
	name: {
		type: String,
		required: [true, 'Course name is required'],
	},
	description: {
		type: String,
		required: [true, 'Course description is required'],
	},
	examinerId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('course', course);
