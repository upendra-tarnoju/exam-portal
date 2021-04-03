const { body } = require('express-validator');

module.exports = {
	SIGNUP: [
		body('firstName').not().isEmpty().withMessage('Required first name'),
		body('lastName').not().isEmpty().withMessage('Required last name'),
		body('email')
			.not()
			.isEmpty()
			.withMessage('Required Email')
			.isEmail()
			.withMessage('Invalid email'),
		body('password').not().isEmpty().withMessage('Required password'),
		body('mobileNumber')
			.not()
			.isEmpty()
			.withMessage('Required mobile number')
			.isLength(10)
			.withMessage('Invalid mobile number'),
		body()
			.custom((body) => {
				const keys = [
					'firstName',
					'lastName',
					'email',
					'password',
					'mobileNumber',
				];
				return Object.keys(body).every((key) => keys.includes(key));
			})
			.withMessage('Some extra parameters are sent'),
	],
};
