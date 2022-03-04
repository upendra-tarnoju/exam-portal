const nodemailer = require('nodemailer');
const { sender, password } = require('./credentials');
let senderAddress = sender;
let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: sender,
		pass: password,
	},
});

module.exports = {
	sender: senderAddress,
	transporter: transporter,
};
