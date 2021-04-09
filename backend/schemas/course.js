const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const course = new Schema({
	name: { type: String, required: true, trim: true },
	description: { type: String, required: true, trim: true },
	examinerId: { type: String },
	createdAt: { type: Date, default: Date.now },
	modifiedAt: { type: Date, default: Date.now },
	defaultCourse: { type: Boolean, required: true },
});

module.exports = mongoose.model('course', course);
