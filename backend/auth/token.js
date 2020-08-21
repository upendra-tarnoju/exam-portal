const jwt = require('jsonwebtoken');

const createToken = (id, accountType) => {
	let privateKey = 'gRG9lIiwiaWF0IjoxNTE2MjM5';
	let object = {
		userId: id,
		type: accountType,
	};
	var token = jwt.sign(object, privateKey, { expiresIn: '10h' });
	return token;
};

module.exports = {
	createToken,
};
