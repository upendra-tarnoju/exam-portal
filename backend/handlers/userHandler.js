const { users, examiner } = require('../models');
const passport = require('passport');

const auth = require('../auth');
const { factories } = require('../factories');

const user = {
	saveUserDetails: async (req, res) => {
		let userData = req.body;
		let existingUser = await users.find({ email: userData.email });

		if (!existingUser) {
			userData.password = factories.generateHashedPassword(
				userData.password
			);
			userData.accountType = 'examiner';

			users
				.create(userData)
				.then((createdUser) => {
					let newExaminer = {
						userId: createdUser._id,
						accountStatus: 'pending',
					};

					examiner.create(newExaminer).then((createdExaminer) => {
						users
							.update(createdUser._id, {
								userDataId: createdExaminer._id,
							})
							.then((response) => {
								res.status(200).send({
									role: 'examiner',
									msg:
										'Your account would be created shortly.You will receive email soon.',
								});
							});
					});
				})
				.catch((err) => {
					let error = Object.values(err.errors)[0].message;
					res.status(400).send({ msg: error });
				});
		} else {
			res.status(200).send({ msg: 'User already existed' });
		}
	},

	loginUser: async (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) return next(err);
			if (!user) return res.status(401).json({ msg: info.message });

			req.logIn(user, (err) => {
				let token = auth.token.create(user);
				res.status(200).send({
					token: token,
					accountType: user.accountType,
					lastLogin: user.lastLogin,
				});
			});
		})(req, res, next);
	},
};

module.exports = user;
