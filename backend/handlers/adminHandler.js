const { users } = require('../models');
const { sender, transporter } = require('../config/mail');

const admin = {
	getExaminerDetails: async (accountStatus, pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let accountType = 'examiner';
		let data = await users.findByAccountStatus(accountStatus, accountType);
		// .skip(pageIndex)
		// .limit(pageSize)
		// .select({ firstName: 1, lastName: 1, email: 1, accountStatus: 1 });
		return data;
	},

	getExaminerCount: async () => {
		let examinerCount = {};
		let examinerData = await users.findByAccountType('examiner');

		examinerCount['pending'] = examinerData.filter(
			(data) => data.examiner.accountStatus == 'pending'
		).length;
		examinerCount['declined'] = examinerData.filter(
			(data) => data.examiner.accountStatus == 'declined'
		).length;
		examinerCount['approved'] = examinerData.filter(
			(data) => data.examiner.accountStatus == 'approved'
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
