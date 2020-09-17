const { question } = require('../schemas');
const mongoose = require('mongoose');

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

	findById(id) {
		return this.questionModel.findById(id);
	}

	update(id, data) {
		return this.questionModel.findByIdAndUpdate(id, data, { new: true });
	}
}

module.exports = new Questions();
