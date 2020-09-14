const { question } = require('../schemas');

class Questions {
	constructor() {
		this.questionModel = question;
	}

	create(question) {
		let questionData = new this.questionModel(question);
		return questionData.save();
	}
}

module.exports = new Questions();
