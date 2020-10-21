const jwt = require('jsonwebtoken');

const createToken = (userData) => {
	console.log(userData);
	let privateKey = 'gRG9lIiwiaWF0IjoxNTE2MjM5';
	let object = {
		userId: userData._id,
		type: userData.accountType,
		firstName: userData.firstName,
		lastName: userData.lastName,
	};
	var token = jwt.sign(object, privateKey, { expiresIn: '10h' });
	return token;
};

module.exports = {
	createToken,
};
