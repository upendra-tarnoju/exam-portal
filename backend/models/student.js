const { student } = require('../schemas');

class Students {
	constructor() {
		this.studentModel = student;
	}

	create(data) {
		let studentData = new this.studentModel(data);
		return studentData.save();
	}
}

module.exports = new Students();
