const { exam } = require('../schemas');

class Exams {
	constructor() {
		this.examModel = exam;
	}

	create = (data) => {
		let examData = new this.examModel(data);
		return examData.save();
	};
}

module.exports = new Exams();
