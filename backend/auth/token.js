const jwt = require('jsonwebtoken');

const create = (userData) => {
	let privateKey = 'gRG9lIiwiaWF0IjoxNTE2MjM5';
	let object = {
		userId: userData._id,
		role: userData.userType,
		firstName: userData.firstName,
		lastName: userData.lastName,
	};
	var token = jwt.sign(object, privateKey, { expiresIn: '10h' });
	return token;
};

module.exports = {
	create,
};
