const faker = require('faker');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../db').connection;
const {
	users,
	examiner,
	course,
	exam,
	question,
	student,
} = require('../models');
const examinerSchema = require('../schemas/examiner');
const courseSchema = require('../schemas/course');
const examSchema = require('../schemas/exam');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const url = `mongodb://127.0.0.1:27017/examin`;

mongoose.connect(url, (err, conn) => {
	if (err) {
		console.log('Mongo error ', err);
	} else {
		console.log('Mongoose Connection is Successful');
	}
});

let courses = [
	{ name: 'BArch', description: 'Bachelor of Architecture' },
	{ name: 'BBA', description: 'Bachelor of Business Administration' },
	{ name: 'BCE', description: 'Bachelor of Civil Engineering' },
	{ name: 'BCE', description: 'Bachelor of Civil Engineering' },
	{ name: 'BChE', description: 'Bachelor of Chemical Engineering' },
	{ name: 'BCA', description: 'Bachelor of Computer Applications' },
	{ name: 'BCom', description: 'Bachelor of Commerce' },
	{ name: 'BHA', description: 'Bachelor in Hotel Administration' },
	{ name: 'BE', description: 'Bachelor of Engineering' },
	{ name: 'BEE', description: 'Bachelor of Electrical Engineering' },
	{ name: 'BJ', description: 'Bachelor of Journalism' },
	{ name: 'BM', description: 'Bachelor of Medicine' },
	{ name: 'BMLT', description: 'Bachelor of Medical Lab Technology' },
	{ name: 'BPEd', description: 'Bachelor of Physical Education' },
	{ name: 'BSc', description: 'Bachelor of Science' },
	{ name: 'BSW', description: 'Bachelor of Social Work' },
	{ name: 'BT', description: 'Bachelor of Tourism' },
	{ name: 'CEE', description: 'Civil Environmental Engineering' },
	{ name: 'CSS', description: 'Computer Science and Systems Engineering' },
	{ name: 'DAS', description: 'Doctor of Applied Science' },
];

let subjects = [
	{ name: 'Accounting' },
	{ name: 'Finance' },
	{ name: 'Marketing' },
	{ name: 'Computing' },
	{ name: 'Multimedia' },
	{ name: 'Nursing' },
	{ name: 'Psychology' },
	{ name: 'Medicine' },
	{ name: 'Philosophy' },
	{ name: 'Literature' },
];

function hashPassword(password) {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
}

async function createAdmin() {
	let firstName = faker.name.firstName();
	let lastName = faker.name.lastName();
	let hash = hashPassword('adminpanel');
	await users.create({
		firstName: firstName,
		lastName: lastName,
		email: 'admin@panel.com',
		password: hash,
		accountType: 'admin',
		accountStatus: 'created',
	});
	console.log('Created Admin');
}

function createUserFakeData(password, accountType) {
	let data = {};
	data.firstName = faker.name.firstName();
	data.lastName = faker.name.lastName();
	data.email = `${data.firstName.toLocaleLowerCase()}${faker.random
		.number()
		.toString()
		.substr(0, 2)}@${faker.internet.domainWord()}.com`;
	data.mobileNumber = faker.phone.phoneNumber('#####-#####');
	data.password = password;
	data.accountType = accountType;
	return data;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createExaminerFakeData(id, accountStatus) {
	let data = {};
	data.userId = id;
	data.department = 'CSE';
	data.designation = 'professor';
	data.accountStatus = accountStatus;
	return data;
}

function createRandomDate() {
	function randomValueBetween(min, max) {
		return Math.random() * (max - min) + min;
	}
	let date1 = '01-01-1997';
	let date2 = '01-01-1999';
	date1 = new Date(date1).getTime();
	date2 = new Date(date2).getTime();
	if (date1 > date2) {
		return new Date(randomValueBetween(date2, date1));
	} else {
		return new Date(randomValueBetween(date1, date2));
	}
}

function createStudentFakeData(id, lastName, examinerId, examList, studentId) {
	let data = {};
	data.userId = id;
	data.fatherName = `${faker.name.firstName()} ${lastName}`;
	data.motherName = `${faker.name.firstName()} ${lastName}`;
	data.dob = createRandomDate();
	data.address = `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.country()}`;
	data.examinerId = examinerId;
	data.gender = 'male';
	data.exam = examList;
	data.studentId = studentId;
	return data;
}

async function createExaminers() {
	let examinerPassword = hashPassword('examiner');
	for (let i = 0; i < 15; i++) {
		//Creating approved examiners
		let fakeUserData = createUserFakeData(examinerPassword, 'examiner');
		let createdUser = await users.create(fakeUserData);

		let fakeExaminerData = createExaminerFakeData(
			createdUser._id,
			'approved'
		);
		let createdExaminer = await examiner.create(fakeExaminerData);

		await users.update(createdUser._id, {
			userDataId: createdExaminer._id,
			institution: faker.random.words(3),
			lastLogin: Date.now(),
		});

		//creating pending examiner
		fakeUserData = createUserFakeData(examinerPassword, 'examiner');
		createdUser = await users.create(fakeUserData);

		fakeExaminerData = createExaminerFakeData(createdUser._id, 'pending');
		createdExaminer = await examiner.create(fakeExaminerData);

		await users.update(createdUser._id, {
			userDataId: createdExaminer._id,
			institution: faker.random.words(3),
		});

		//creating declined examiner
		fakeUserData = createUserFakeData(examinerPassword, 'examiner');
		createdUser = await users.create(fakeUserData);

		fakeExaminerData = createExaminerFakeData(createdUser._id, 'declined');
		createdExaminer = await examiner.create(fakeExaminerData);

		await users.update(createdUser._id, {
			userDataId: createdExaminer._id,
			institution: faker.random.words(3),
		});
	}
	console.log('Created examiners');
}

async function createCourses() {
	let approvedExaminers = await examinerSchema.find({
		accountStatus: 'approved',
	});
	for (let i = 0; i < approvedExaminers.length; i++) {
		let min = faker.random.number({ min: 0, max: 19 });
		let max = faker.random.number({ min: 0, max: 19 });
		if (min > max) {
			let temp = min;
			min = max;
			max = temp;
		}
		for (let j = min; j <= max; j++) {
			await course.create({
				name: courses[j].name,
				description: courses[j].description,
				examinerId: approvedExaminers[i].userId,
			});
		}
	}
	console.log('Created courses');
}

async function createExam() {
	let approvedExaminers = await examinerSchema.find({
		accountStatus: 'approved',
	});
	let examPassword = hashPassword('exam');
	for (let i = 0; i < approvedExaminers.length; i++) {
		for (let j = 0; j < 15; j++) {
			let number = faker.random.number({ min: 0, max: 9 });
			let randomDate = faker.random.number({ min: 1, max: 30 });
			let presentDate = new Date();
			let startTime = presentDate.setHours(9);
			let endTime = presentDate.setHours(12);
			let examDate = presentDate.setDate(presentDate.getDate() + randomDate);
			let course = await courseSchema
				.find({
					examinerId: approvedExaminers[i].userId,
				})
				.skip(number)
				.limit(1);
			if (course.length !== 0) {
				await exam.create({
					subject: subjects[number].name,
					course: course[0]._id,
					examCode: `${subjects[number].name.slice(
						0,
						2
					)}${faker.random.number({
						min: 101,
						max: 999,
					})}`,
					password: examPassword,
					totalMarks: 100,
					passingMarks: 40,
					examinerId: approvedExaminers[i].userId,
					examDate: examDate,
					startTime: startTime,
					endTime: endTime,
				});
			}
		}
	}
	console.log('Created exams');
}

async function createQuestions() {
	let exams = await examSchema.find();
	for (let j = 0; j < exams.length; j++) {
		let totalQuestions = faker.random.number(5, 20);
		for (let k = 0; k < totalQuestions; k++) {
			let totalOptions = getRandomInt(2, 6);
			if (totalOptions <= 1) {
				totalOptions = totalOptions + 2;
			}
			let options = [];
			for (let l = 0; l < totalOptions; l++) {
				let opt = {};
				opt.name = `option${l + 1}`;
				opt.value = faker.random.words(3);
				options.push(opt);
			}
			await question.create({
				examId: exams[j]._id,
				question: faker.random.words(10),
				optionType: 'single',
				options: options,
				correctAnswer: `option${getRandomInt(1, totalOptions)}`,
			});
		}
	}

	console.log('Created questions');
}

async function createStudent() {
	let exams = await examSchema.find();
	let studentPassword = hashPassword('student');
	for (let i = 0; i < exams.length; i++) {
		let fakeUserData = createUserFakeData(studentPassword, 'student');
		let newUser = await users.create(fakeUserData);

		let totalExams = getRandomInt(1, 4);
		let examList = [];
		for (j = 0; j < totalExams; j++) {
			let exam = {};
			let randomNumber = getRandomInt(0, exams.length - 1);
			exam.examId = exams[randomNumber]._id;
			examList.push(exam);
		}
		let studentId = `UID${i}`;
		let fakeStudentData = createStudentFakeData(
			newUser._id,
			fakeUserData.lastName,
			exams[i].examinerId,
			examList,
			studentId
		);

		let newStudent = await student.create(fakeStudentData);
		await users.update(newUser._id, {
			userDataId: newStudent._id,
			institution: faker.random.words(3),
			lastLogin: Date.now(),
		});
	}
	console.log('Created student');
}

async function createSampleData() {
	// await createAdmin();
	// await createExaminers();
	// await createCourses();
	await createExam();
	// await createQuestions();
	// await createStudent();
	mongoose.connection.close();
}

createSampleData();
