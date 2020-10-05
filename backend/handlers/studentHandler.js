let bcrypt = require('bcryptjs');

let { student, users } = require('../models');

let hashPassword = (password) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
};

let checkExistingStudent = async (mobileNumber, email) => {
	let studentArray = [{ mobileNumber }, { email }];

	let existingStudent = await users.findByEmailAndMobileNumber(studentArray);
	if (existingStudent) {
		if (mobileNumber === existingStudent.mobileNumber)
			return 'Mobile already existed';
		else return 'Email ID already existed';
	} else return '';
};

const students = {
	addNewStudent: async (studentData) => {
		let msg = await checkExistingStudent(
			studentData.mobileNumber,
			studentData.email
		);

		if (msg) {
			return msg;
		} else {
			studentData.password = hashPassword(studentData.password);
			let userData = await users.create(studentData);
			studentData.userId = userData._id;

			let newStudent = await student.create(studentData);
			await users.update(userData._id, { userDataId: newStudent._id });
			let msg = 'New student added';

			return msg;
		}
	},
};

module.exports = students;
