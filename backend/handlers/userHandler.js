const { users } = require('../models');
const bcrypt = require('bcryptjs');
checkAccountStatus = (data) => {
	if (data.accountType == 'examiner') {
		data.accountStatus = 'pending';
	} else {
		data.accountStatus = 'created';
	}
	return data;
};

const user = {
	save_user_details: async (req, res) => {
		let existingUser = await users.find(req.body.email);
		if (existingUser == null) {
			let password = req.body.password;
			let salt = bcrypt.genSaltSync(10);
			let hash = bcrypt.hashSync(password, salt);
			req.body.password = hash;
			let data = checkAccountStatus(req.body);
			await users
				.create(req.body)
				.then((user) => {
					if (user.accountType == 'examiner') {
						res.status(200).send({
							role: 'examiner',
							msg:
								'Your account would be created shortly.You will receive email soon.',
						});
					} else {
						res.status(200).send({
							role: 'student',
							msg: 'User created successfully',
						});
					}
				})
				.catch((err) => {
					let error = Object.values(err.errors)[0].message;
					res.status(400).send(error);
				});
		} else {
			res.status(200).send({ msg: 'User already existed' });
		}
	},
};

module.exports = user;
