let bcrypt = require('bcryptjs');
let csv = require('csvtojson');
let fs = require('fs');

let { student, users, exam } = require('../models');
const user = require('../models/user');

let hashPassword = (password) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
};

const students = {
	addNewStudent: async (studentData) => {
		let existingStudent;
		let existingUser = await users.findByEmailAndMobileNumber(studentData);
		studentData.password = hashPassword(studentData.password);
		if (existingUser) {
			existingStudent = await student.findByStudentId(
				existingUser.userDataId,
				studentData
			);
			if (existingStudent) {
				let msg = 'Student is already added in this exam';
				return { status: 400, msg: msg };
			} else {
				await student.updateExam(existingUser.userDataId, {
					examId: studentData.examCode,
				});
				let msg = 'New student added';
				return { status: 200, msg: msg };
			}
		} else {
			let userData = await users.create(studentData);
			studentData.userId = userData._id;
			let newStudent = await student.create(studentData);
			await users.update(userData._id, { userDataId: newStudent._id });
			await student.updateExam(newStudent._id, {
				examId: studentData.examCode,
			});
			let msg = 'New student added';
			return { status: 200, msg: msg };
		}
	},

	getAllStudents: async (examinerId, pageQuery) => {
		let pageIndex = parseInt(pageQuery.pageIndex, 10);
		let pageSize = parseInt(pageQuery.pageSize, 10);
		pageIndex = pageIndex * pageSize;
		let examData = await exam
			.findExamStudents(examinerId)
			.skip(pageIndex)
			.limit(pageSize);

		return examData;
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

	updateStudentAccountStatus: async (studentId, data) => {
		let updatedData = await student.updateStudentAccountStatus(
			studentId,
			data
		);
		if (updatedData) {
			return { status: 200, msg: 'Student account status updated' };
		}
	},

	updateStudentDetails: async (studentId, data) => {
		let updatedPersonalDetails = await user
			.updateByUserDataId(
				{
					userDataId: studentId,
				},
				data
			)
			.select({ firstName: 1, lastName: 1, email: 1, mobileNumber: 1 });
		let updatedOtherDetails = await student
			.updateStudentDetails(studentId, data)
			.select({ userId: 0, examinerId: 0, __v: 0 });
		return {
			status: 200,
			data: {
				personalDetails: updatedPersonalDetails,
				otherDetails: updatedOtherDetails,
				msg: 'Student is updated successfully',
			},
		};
	},

	updateStudentPassword: async (studentId, password) => {
		let updatedData = await users.updateByUserDataId(studentId, { password });
		if (updatedData) {
			return { status: 200, msg: 'Password updated successsfully' };
		}
	},

	getParticularExamStudents: async (examId) => {
		let studentDetails = await student.findStudentsByExamId(examId);
		return studentDetails;
	},

	uploadStudentFile: async (filePath, examId, examinerId) => {
		let csvData = await csv().fromFile(filePath);
		let existingStudent;
		for (let i = 0; i < csvData.length; i++) {
			let studentData = csvData[i];
			studentData.accountType = 'student';
			studentData.examinerId = examinerId;
			let existingUser = await users.findByEmailAndMobileNumber(studentData);
			studentData.password = hashPassword(studentData.password);
			if (existingUser) {
				existingStudent = await student.findByStudentId(
					existingUser.userDataId,
					studentData
				);
				if (!existingStudent) {
					await student.updateExam(existingUser.userDataId, { examId });
				}
			} else {
				let userData = await users.create(studentData);
				studentData.userId = userData._id;
				let newStudent = await student.create(studentData);
				await users.update(userData._id, { userDataId: newStudent._id });
				await student.updateExam(newStudent._id, {
					examId,
				});
			}
		}
	},
};

module.exports = students;
