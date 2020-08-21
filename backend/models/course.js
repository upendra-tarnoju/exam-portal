const { course } = require('../schemas');
const user = require('../handlers/userHandler');

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
}

module.exports = new Course();
