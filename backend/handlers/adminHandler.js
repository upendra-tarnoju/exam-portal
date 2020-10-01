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
		let updatedExaminer = await users
			.update(examinerId, {
				accountStatus: accountStatus,
			})
			.select({ email: 1, accountStatus: 1 });
		let mailOptions = {
			to: updatedExaminer.email,
			from: sender,
			subject: 'Examiner confirmation mail',
			text: `Your email id ${updatedExaminer.email} has been successfully registered as examiner`,
		};
		transporter.sendMail(mailOptions);
		return {
			msg: `Examiner ${updatedExaminer.accountStatus}`,
			accountStatus: updatedExaminer.accountStatus,
			_id: updatedExaminer._id,
		};
	},
};

module.exports = admin;
