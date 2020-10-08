let bcrypt = require('bcryptjs');

let { student, users } = require('../models');

let hashPassword = (password) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
};

let checkExistingStudent = async (mobileNumber, email, accountType) => {
	let existingStudent = await users.findByEmailAndMobileNumber(
		mobileNumber,
		email,
		accountType
	);
	if (existingStudent) {
		if (mobileNumber === existingStudent.mobileNumber)
			return 'Mobile number already existed';
		else return 'Email ID already existed';
	} else return '';
};

const students = {
	addNewStudent: async (studentData) => {
		let msg = await checkExistingStudent(
			studentData.mobileNumber,
			studentData.email,
			'student'
		);

		if (msg) {
			return { status: 409, msg: msg };
		} else {
			studentData.password = hashPassword(studentData.password);
			let userData = await users.create(studentData);
			studentData.userId = userData._id;
			let newStudent = await student.create(studentData);
			await users.update(userData._id, { userDataId: newStudent._id });
			let msg = 'New student added';
			return { status: 200, msg: msg };
		}
	},

	getAllStudents: async (examinerId, pageQuery) => {
		let pageIndex = parseInt(pageQuery.pageIndex, 10);
		let pageSize = parseInt(pageQuery.pageSize, 10);
		pageIndex = pageIndex * pageSize;
		let studentData = await student
			.find(examinerId)
			.skip(pageIndex)
			.limit(pageSize);
		return studentData;
	},

	getStudentsLength: async (examinerId) => {
		let studentData = await student.findByExaminerId(examinerId);
		return studentData.length;
	},
};

module.exports = students;
