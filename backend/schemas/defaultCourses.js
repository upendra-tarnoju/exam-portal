const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const defaultCourse = new Schema({
	name: { type: String, trim: true },
	description: { type: String, required: true, trim: true },
	createdAt: { type: Date, default: Date.now },
	modifiedAt: { type: Date, default: Date.now },
	courseId: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('defaultCourse', defaultCourse);
