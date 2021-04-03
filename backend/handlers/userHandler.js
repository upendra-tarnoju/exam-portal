const passport = require('passport');

const { users, examiner } = require('../models');
const auth = require('../auth');
const { factories } = require('../factories');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');

const user = {
	saveUserDetails: async (userData) => {
		try {
			let existingUser = await users.find({ email: userData.email });

			if (!existingUser) {
				userData.password = factories.generateHashedPassword(userData.password);
				userData.accountType = APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER;

				let createdUser = await users.create(userData);

				let newExaminer = {
					userId: createdUser._id,
					accountStatus: APP_DEFAULTS.ACCOUNT_STATUS.PENDING,
				};

				let createdExaminer = await examiner.create(newExaminer);
				return {
					status: RESPONSE_MESSAGES.EXAMINER_SIGNUP.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.EXAMINER_SIGNUP.SUCCESS.MSG },
				};
			} else {
				return {
					status:
						RESPONSE_MESSAGES.EXAMINER_SIGNUP.DUPLICATE_RESOURCE.STATUS_CODE,
					data: {
						msg: RESPONSE_MESSAGES.EXAMINER_SIGNUP.DUPLICATE_RESOURCE.MSG,
					},
				};
			}
		} catch (err) {
			throw err;
			// let error = Object.values(err.errors)[0].message;
			// return {
			// 	status: RESPONSE_MESSAGES.EXAMINER_SIGNUP.MONGOOSE_ERROR.STATUS_CODE,
			// 	data: { msg: error },
			// };
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
