const { question } = require('../schemas');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class Questions {
	constructor() {
		this.questionModel = question;
	}

	create(question) {
		let questionData = new this.questionModel(question);
		return questionData.save();
	}

	getSpecificData(examId) {
		return this.questionModel.find({ examId: examId });
	}
}

module.exports = new Questions();
