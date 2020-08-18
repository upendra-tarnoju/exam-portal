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
}

module.exports = new Course();
