const { exam } = require('../schemas');

class Exams {
	constructor() {
		this.examModel = exam;
	}

	create = (data) => {
		let examData = new this.examModel(data);
		return examData.save();
	};

	get = (id) => {
		return this.examModel.find({ examinerId: id });
	};
}

module.exports = new Exams();
