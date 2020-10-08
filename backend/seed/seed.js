const faker = require('faker');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
require('../db').connection;
const { users, course, examiner, student } = require('../schemas');

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

async function createCourses() {
	let totalCourses = 300;
	let examinerId = '5f3908829b9d72178cf822af';
	for (let i = 0; i < totalCourses; i++) {
		let courseName = faker.lorem.word().slice(0, 3).toLocaleUpperCase();
		let courseDescription = faker.lorem.words(3);
		let courseObject = new course({
			name: courseName,
			description: courseDescription,
			examinerId: examinerId,
		});
		await courseObject.save();
	}
	console.log('course created for particular user');
}

async function createUserData() {
	//Creating examiner
	let totalExaminer = 22;
	await users.remove();

	for (let i = 0; i < totalExaminer; i++) {
		let firstName = faker.name.firstName();
		let lastName = faker.name.lastName();
		let email = `${firstName.toLocaleLowerCase()}${faker.random
			.number()
			.toString()
			.substr(0, 2)}@${faker.internet.domainWord()}.com`;
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync('sample', salt);
		let userObject = new users({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hash,
			accountType: 'examiner',
			mobileNumber: '1234567890',
		});
		let data = await userObject.save();
		let examinerObject = new examiner({
			accountStatus: 'pending',
			userId: data._id,
		});
		let examinerData = await examinerObject.save();
		await users.findByIdAndUpdate(data._id, {
			$set: { userDataId: examinerData._id },
		});
	}

	//Creating admin
	let firstName = faker.name.firstName();
	let lastName = faker.name.lastName();
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync('admin', salt);
	let userObject = new users({
		firstName: firstName,
		lastName: lastName,
		email: 'admin@panel.com',
		password: hash,
		accountType: 'admin',
		accountStatus: 'created',
	});
	await userObject.save();
}

//Creating student for particular examiner
async function createStudent() {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync('sample', salt);
	let examinerId = ObjectId('5f7c76dfc6183219e837f792');
	let totalStudents = 12;
	for (let i = 0; i < totalStudents; i++) {
		let firstName = faker.name.firstName();
		let lastName = faker.name.lastName();
		let email = `${firstName.toLocaleLowerCase()}${faker.random
			.number()
			.toString()
			.substr(0, 2)}@${faker.internet.domainWord()}.com`;
		let userObject = new users({
			firstName: firstName,
			lastName: lastName,
			email: email,
			mobileNumber: faker.phone.phoneNumber('+91 ####-######'),
			password: hash,
			accountType: 'student',
		});
		let data = await userObject.save();
		let studentObject = new student({
			fatherName: `${faker.name.firstName()} ${lastName}`,
			motherName: `${faker.name.firstName()} ${lastName}`,
			dob: '2020-10-13',
			address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}`,
			examinerId: examinerId,
			userId: data._id,
		});
		let studentData = await studentObject.save();
		await users.findByIdAndUpdate(data._id, {
			$set: { userDataId: studentData._id },
		});
	}
	console.log('student created');
}

// createUserData();
createStudent();

// createCourses();
