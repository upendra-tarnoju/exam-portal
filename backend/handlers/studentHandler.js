let bcrypt = require('bcryptjs');

let { student, users } = require('../models');

let hashPassword = (password) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
};

let checkExistingStudent = async (
	mobileNumber,
	email,
	studentId,
	accountType
) => {
	let existingUser = await users.findByEmailAndMobileNumber(
		mobileNumber,
		email,
		accountType
	);
	let existingStudent = await student.findByStudentId(studentId);
	if (existingUser) {
		if (mobileNumber === existingUser.mobileNumber)
			return 'Mobile number already existed';
		else return 'Email ID already existed';
	} else if (existingStudent) {
		return 'Student Id already existed';
	} else return '';
};

const students = {
	addNewStudent: async (studentData) => {
		let msg = await checkExistingStudent(
			studentData.mobileNumber,
			studentData.email,
			studentData.studentId,
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

	delete: async (studentId) => {
		let data = await student.delete(studentId);
		await users.deleteByUserDataId(data.userId);
		return { status: 200, msg: 'Student deleted successfully' };
	},
};

module.exports = students;
