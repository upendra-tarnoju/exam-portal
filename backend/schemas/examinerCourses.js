const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examinerCourses = new Schema({
	examinerId: { type: Schema.Types.ObjectId, required: true },
	createdDate: { type: Number, default: Date.now },
	modifiedDate: { type: Number, default: Date.now },
	courseId: { type: Schema.Types.ObjectId, ref: 'defaultCourse' },
	description: { type: String, required: true, trim: true },
	status: { type: String, default: 'ACTIVE' },
});

module.exports = mongoose.model('examinerCourses', examinerCourses);
