const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcryptjs = require('bcryptjs');

const { users, examiner } = require('../models');
const userSchema = require('../schemas').users;

module.exports = (passport) => {
	passport.use(
		new LocalStrategy((email, password, done) => {
			users
				.find(email)
				.select({
					email: 1,
					accountType: 1,
					password: 1,
					lastLogin: 1,
				})
				.then((user) => {
					if (user) {
						examiner
							.find({ userId: user._id })
							.select({ accountStatus: 1 })
							.then((userData) => {
								if (user.accountType === 'examiner') {
									if (userData.accountStatus !== 'approved') {
										return done(null, false, {
											message: 'Account not approved',
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
								} else if (user.accountType === 'admin') {
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
							});
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
