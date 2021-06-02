const bcrypt = require('bcryptjs');
let moment = require('moment');

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

	compareExamDate: (examDate, examEndTime) => {
		let currentDate = new Date();

		let formattedExamDate = moment(examDate).format('YYYY-MM-DD');
		let formattedCurrentDate = moment(currentDate).format('YYYY-MM-DD');

		if (formattedExamDate == formattedCurrentDate) {
			let formattedExamEndTime = moment(examEndTime).format('HH:mm:ss a');
			let formattedCurrentTime = moment(currentDate).format('HH:mm:ss a');
			if (formattedExamEndTime <= formattedCurrentTime) {
				return 'before';
			}

			return 'same';
		} else if (formattedExamDate < formattedCurrentDate) {
			return 'before';
		} else {
			return 'after';
		}
	},

	studentExcelFileColumns: () => {
		return [
			{ header: 'Student ID', key: 'studentId', width: 12 },
			{ header: 'First name', key: 'firstName', width: 12 },
			{ header: 'Last name', key: 'lastName', width: 12 },
			{ header: 'Mobile number', key: 'mobileNumber', width: 12 },
			{ header: 'Father name', key: 'fatherName', width: 12 },
			{ header: 'Mother name', key: 'motherName', width: 12 },
			{ header: 'Gender', key: 'gender', width: 12 },
			{ header: 'Date of birth', key: 'dob', width: 12 },
			{ header: 'Address', key: 'address', width: 12 },
			{ header: 'City', key: 'city', width: 12 },
			{ header: 'State', key: 'state', width: 12 },
			{ header: 'Email', key: 'email', width: 12 },
			{ header: 'Password', key: 'password', width: 12 },
		];
	},
};

module.exports = factories;
