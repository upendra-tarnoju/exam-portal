const { users } = require('../models');
const userSchema = require('../schemas').users;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcryptjs = require('bcryptjs');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy((email, password, done) => {
			users
				.find(email)
				.select({
					email: 1,
					accountType: 1,
					accountStatus: 1,
					password: 1,
					lastLogin: 1,
				})
				.then((user) => {
					if (user) {
						if (
							user.accountStatus !== 'approved' &&
							user.accountStatus !== 'created'
						) {
							return done(null, false, {
								message: 'Your account is not approved',
							});
						} else {
							let userStatus = bcryptjs.compareSync(
								password,
								user.password
							);
							if (userStatus) return done(null, user);
							else
								return done(null, false, {
									message: 'Incorrect credentials',
								});
						}
					} else {
						return done(null, false, {
							message: 'Incorrect credentials',
						});
					}
				});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		userSchema.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(
					'Authorization'
				),
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
