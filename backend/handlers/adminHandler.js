const { users } = require('../models');
const { sender, transporter } = require('../config/mail');
const admin = {
	getExaminerDetails: async (type, pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let data = await users
			.findByAccountStatus(type)
			.skip(pageIndex)
			.limit(pageSize)
			.select({ firstName: 1, lastName: 1, email: 1, accountStatus: 1 });
		return data;
	},

	getExaminerCount: async () => {
		let examinerCount = {};
		let examinerData = await users.findByAccountType('examiner');
		examinerCount['pending'] = examinerData.filter(
			(data) => data.accountStatus == 'pending'
		).length;
		examinerCount['declined'] = examinerData.filter(
			(data) => data.accountStatus == 'declined'
		).length;
		examinerCount['approved'] = examinerData.filter(
			(data) => data.accountStatus == 'approved'
		).length;
		return examinerCount;
	},

	approveOrDeclineExaminer: async (examinerId, accountStatus) => {
		users.update(examinerId, accountStatus).then((user) => {
			let mailOptions = {
				to: user.email,
				from: sender,
				subject: 'Examiner confirmation mail',
				text: `Your email id ${user.email} has been successfully registered as examiner`,
			};
			transporter.sendMail(mailOptions);
			return 'Examiner approved';
		});
	},
};

module.exports = admin;
