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

	update = (id, data) => {
		return this.examModel.findOneAndUpdate({ examinerId: id }, data, {
			new: true,
		});
	};

	deleteById = (id) => {
		return this.examModel.findByIdAndDelete(id);
	};
}

module.exports = new Exams();
