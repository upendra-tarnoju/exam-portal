const { course } = require('../schemas');

class Course {
	constructor() {
		this.courseModel = course;
	}

	create = (data) => {
		const userData = new this.courseModel(data);
		return userData.save();
	};

	find = (examinerId, name) => {
		return this.courseModel.find({
			$and: [{ examinerId: examinerId, name: name }],
		});
	};

	findByExaminerId = (examinerId) => {
		return this.courseModel.find({ examinerId });
	};

	update = (course) => {
		return this.courseModel.findByIdAndUpdate(
			course.courseId,
			{
				$set: {
					name: course.name,
					description: course.description,
					modifiedAt: Date.now(),
				},
			},
			{ new: true }
		);
	};

	search = (name, description) => {
		let nameRegExp = new RegExp(name);
		let descRegExp = new RegExp(description);
		return this.courseModel.find({
			name: { $regex: nameRegExp, $options: 'i' },
			description: { $regex: descRegExp, $options: 'i' },
		});
	};

	delete = (courseId) => {
		return this.courseModel.findByIdAndRemove(courseId);
	};
}

module.exports = new Course();
