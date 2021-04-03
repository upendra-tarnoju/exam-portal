const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { users } = require('../models');
const { factories } = require('../factories');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');

let comparePassword = (typedPassword, user, done) => {
	let userStatus = factories.compareHashedPassword(
		typedPassword,
		user.password
	);
	if (userStatus) return done(null, user);
	else
		return done(null, false, {
			...RESPONSE_MESSAGES.INCORRECT_CREDENTIALS,
		});
};

module.exports = (passport) => {
	passport.use(
		new LocalStrategy((email, password, done) => {
			users.find({ email: email }).then((user) => {
				if (user) {
					if (user.userType === APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER) {
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
			});
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
