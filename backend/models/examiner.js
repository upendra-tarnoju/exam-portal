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
		return this.examinerModel.find(userId);
	}
}

module.exports = new Examiner();
