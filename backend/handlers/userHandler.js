const passport = require('passport');

const { users } = require('../models');
const auth = require('../auth');
const { factories } = require('../factories');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');
const { queries } = require('../db');
const Schema = require('../schemas');

const user = {
	saveUserDetails: async (userData) => {
		try {
			let query = {
				email: userData.email,
				userType: APP_DEFAULTS.ACCOUNT_TYPE.SUB_ADMIN,
			};
			let options = { lean: true };

			let existingUser = await queries.findOne(Schema.users, query, options);

			if (!existingUser) {
				userData.password = factories.generateHashedPassword(userData.password);
				userData.userType = APP_DEFAULTS.ACCOUNT_TYPE.SUB_ADMIN;
				userData.status = APP_DEFAULTS.ACCOUNT_STATUS.PENDING;
				userData.collegeId = userData.college._id;

				await queries.create(Schema.users, userData);
				return {
					status: RESPONSE_MESSAGES.SUB_ADMIN_SIGNUP.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.SUB_ADMIN_SIGNUP.SUCCESS.MSG },
				};
			} else {
				return {
					status:
						RESPONSE_MESSAGES.SUB_ADMIN_SIGNUP.DUPLICATE_RESOURCE.STATUS_CODE,
					data: {
						msg: RESPONSE_MESSAGES.SUB_ADMIN_SIGNUP.DUPLICATE_RESOURCE.MSG,
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

	getCollegeList: async () => {
		try {
			let query = {};
			let projections = { name: 1 };
			let options = { lean: true, $rename: { _id: 'id' } };
			let collegeList = await queries.getData(
				Schema.college,
				query,
				projections,
				options
			);
			return { status: 200, data: { collegeList } };
		} catch (err) {
			throw err;
		}
	},
};

module.exports = user;
