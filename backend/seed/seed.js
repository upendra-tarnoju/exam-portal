const faker = require('faker');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('../db').connection;
const { users } = require('../schemas');

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
async function createUserData() {
	//Creating examiner
	let totalExaminer = 7;
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
			accountStatus: 'pending',
		});
		await userObject.save();
		console.log('creating user');
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

createUserData();
