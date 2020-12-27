const bcrypt = require('bcryptjs');

let factories = {
	generateHashedPassword: (password) => {
		let salt = bcrypt.genSaltSync(10);
		let hashedPassword = bcrypt.hashSync(password, salt);
		return hashedPassword;
	},

	compareHashedPassword: (typedPassword, actualPassword) => {
		let comparedPasswordStatus = bcrypt.compareSync(
			typedPassword,
			actualPassword
		);
		return comparedPasswordStatus;
	},

	createExamObject: (data, userId) => {
		let hashedPassword = this.generateHashedPassword(data.password);
		let object = {
			subject: data.subject,
			course: data.course,
			examCode: data.examCode,
			password: hashedPassword,
			totalMarks: parseInt(data.totalMarks, 10),
			passingMarks: parseInt(data.passingMarks, 10),
			examinerId: userId,
			startTime: new Date(`${data.examDate} ${data.startTime}`),
			endTime: new Date(`${data.examDate} ${data.endTime}`),
			examDate: new Date(data.examDate),
			negativeMarks: data.negativeMarks,
		};
		if (!data.hideDuration) {
			object.duration = data.duration;
		}
		return object;
	},
};

module.exports = factories;
