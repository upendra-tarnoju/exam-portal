const passport = require('passport');

const { users } = require('../models');
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
				userData.userType = APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER;
				userData.status = APP_DEFAULTS.ACCOUNT_STATUS.PENDING;

				await users.create(userData);
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
		}
	},

	loginUser: async (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) return next(err);

			if (!user) return res.status(info.STATUS_CODE).json({ msg: info.MSG });

			req.logIn(user, (err) => {
				let token = auth.token.create(user);
				res.status(200).send({
					token: token,
					userType: user.userType,
					lastLogin: user.lastLogin,
				});
			});
		})(req, res, next);
	},
};

module.exports = user;
