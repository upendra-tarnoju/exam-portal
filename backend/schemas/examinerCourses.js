const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examinerCourses = new Schema({
	examinerId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
	modifiedAt: { type: Date, default: Date.now },
	courseId: { type: Schema.Types.ObjectId, ref: 'defaultCourse' },
	name: { type: String, trim: true },
	description: { type: String, required: true, trim: true },
	status: { type: String, default: 'ACTIVE' },
});

module.exports = mongoose.model('examinerCourses', examinerCourses);
