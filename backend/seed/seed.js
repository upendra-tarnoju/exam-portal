const faker = require('faker');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
require('../db').connection;
const { users, examiner, course, exam, question } = require('../models');
const examinerSchema = require('../schemas/examiner');
const courseSchema = require('../schemas/course');
const examSchema = require('../schemas/exam');
const questionSchema = require('../schemas/question');

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

function createUserFakeData(examinerPassword, accountType) {
	let data = {};
	data.firstName = faker.name.firstName();
	data.lastName = faker.name.lastName();
	data.email = `${data.firstName.toLocaleLowerCase()}${faker.random
		.number()
		.toString()
		.substr(0, 2)}@${faker.internet.domainWord()}.com`;
	data.mobileNumber = faker.phone.phoneNumber('#####-#####');
	data.password = examinerPassword;
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

		let updatedUser = await users.update(createdUser._id, {
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
			await exam.create({
				subject: subjects[number].name,
				course: course._id,
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

async function createSampleData() {
	await createAdmin();
	await createExaminers();
	await createCourses();
	await createExam();
	await createQuestions();
	mongoose.connection.close();
}

createSampleData();

// //Creating student for particular examiner
// async function createStudent() {
// 	let salt = bcrypt.genSaltSync(10);
// 	let hash = bcrypt.hashSync('sample', salt);
// 	let examinerId = ObjectId('5f7c76dfc6183219e837f792');
// 	let totalStudents = 12;
// 	for (let i = 0; i < totalStudents; i++) {
// 		let firstName = faker.name.firstName();
// 		let lastName = faker.name.lastName();
// 		let email = `${firstName.toLocaleLowerCase()}${faker.random
// 			.number()
// 			.toString()
// 			.substr(0, 2)}@${faker.internet.domainWord()}.com`;
// 		let userObject = new users({
// 			firstName: firstName,
// 			lastName: lastName,
// 			email: email,
// 			mobileNumber: faker.phone.phoneNumber('+91 ####-######'),
// 			password: hash,
// 			accountType: 'student',
// 		});
// 		let data = await userObject.save();
// 		let studentObject = new student({
// 			fatherName: `${faker.name.firstName()} ${lastName}`,
// 			motherName: `${faker.name.firstName()} ${lastName}`,
// 			dob: '2020-10-13',
// 			address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}`,
// 			examinerId: examinerId,
// 			userId: data._id,
// 		});
// 		let studentData = await studentObject.save();
// 		await users.findByIdAndUpdate(data._id, {
// 			$set: { userDataId: studentData._id },
// 		});
// 	}

// 	console.log('student created');
// }

// // createUserData();
// createStudent();

// // createCourses();
