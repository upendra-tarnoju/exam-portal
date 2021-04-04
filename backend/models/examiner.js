const { examiner } = require('../schemas');

class Examiner {
	constructor() {
		this.examinerModel = examiner;
	}

	create(data) {
		let examinerData = new this.examinerModel(data);
		return examinerData.save();
	}

	find(userId) {
		return this.examinerModel.findOne(userId);
	}

	update = (id, toUpdate) => {
		return this.examinerModel.findByIdAndUpdate(id, toUpdate, { new: true });
	};
}

module.exports = new Examiner();
