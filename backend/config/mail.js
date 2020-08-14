const nodemailer = require('nodemailer');
const { email, password } = require('./mailConfig');

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: email,
		pass: password,
	},
});

module.exports = {
	transporter,
};
