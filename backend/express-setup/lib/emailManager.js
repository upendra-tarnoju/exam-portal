const sendGridMail = require('@sendgrid/mail');

const emailManager = {
	sendEmail: (smtpCredentials, emailData) => {
		try {
			sendGridMail.setApiKey(smtpCredentials.smtpAPIKey);
			let email = {
				to: emailData.receiver,
				from: smtpCredentials.smtpSenderEmail,
				subject: emailData.subject ? emailData.subject : '',
				html: emailData.body,
			};

			return sendGridMail.send(email, true);
		} catch (err) {
			throw err;
		}
	},
};

module.exports = emailManager;
