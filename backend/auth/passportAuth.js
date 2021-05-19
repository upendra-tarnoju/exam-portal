const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const moment = require('moment');

const { users } = require('../models');
const { factories } = require('../factories');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');
const { queries } = require('../db');
const Schema = require('../schemas');

let comparePassword = async (typedPassword, user, done) => {
	let userStatus = factories.compareHashedPassword(
		typedPassword,
		user.password
	);
	if (userStatus) {
		let condition = { _id: mongoose.Types.ObjectId(user._id) };
		let toUpdate = { lastLogin: moment().valueOf() };
		let options = {};

		await queries.findAndUpdate(Schema.users, condition, toUpdate, options);
		return done(null, user);
	} else
		return done(null, false, {
			...RESPONSE_MESSAGES.INCORRECT_CREDENTIALS,
		});
};

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(async (email, password, done) => {
			try {
				let query = { email: email };
				let projections = {
					userType: 1,
					status: 1,
					password: 1,
					firstName: 1,
					lastName: 1,
				};
				let options = { lean: true };

				let user = await queries.findOne(
					Schema.users,
					query,
					projections,
					options
				);

				if (user) {
					if (
						user.userType === APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER ||
						user.userType === APP_DEFAULTS.ACCOUNT_TYPE.SUB_ADMIN
					) {
						if (user.status === APP_DEFAULTS.ACCOUNT_STATUS.PENDING) {
							return done(null, false, {
								...RESPONSE_MESSAGES.ACCOUNT_STATUS.PENDING,
							});
						} else if (user.status === APP_DEFAULTS.ACCOUNT_STATUS.DECLINED) {
							return done(null, false, {
								...RESPONSE_MESSAGES.ACCOUNT_STATUS.DECLINED,
							});
						} else {
							return comparePassword(password, user, done);
						}
					} else if (
						user.userType === APP_DEFAULTS.ACCOUNT_TYPE.STUDENT ||
						APP_DEFAULTS.ACCOUNT_TYPE.ADMIN
					) {
						return comparePassword(password, user, done);
					}
				} else {
					return done(null, false, {
						...RESPONSE_MESSAGES.INCORRECT_CREDENTIALS,
					});
				}
			} catch (err) {
				throw err;
			}
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		users.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
				secretOrKey: 'gRG9lIiwiaWF0IjoxNTE2MjM5',
			},
			function (jwtPayload, cb) {
				return users
					.findById(jwtPayload.userId)
					.select({ username: 1 })
					.then((user) => {
						return cb(null, user);
					})
					.catch((err) => {
						return cb(err);
					});
			}
		)
	);
};
