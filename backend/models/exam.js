const { exam } = require('../schemas');

class Exams {
	constructor() {
		this.examModel = exam;
	}

	create = (data) => {
		let examData = new this.examModel(data);
		return examData.save();
	};

	get = (data) => {
		return this.examModel.find(data);
	};

	update = (id, data) => {
		return this.examModel.findOneAndUpdate({ examinerId: id }, data, {
			new: true,
		});
	};

	deleteById = (id) => {
		return this.examModel.findByIdAndDelete(id);
	};

	getById = (id) => {
		return this.examModel.findById(id);
	};
}

module.exports = new Exams();
