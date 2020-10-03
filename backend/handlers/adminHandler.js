const { users, examiner } = require('../models');
const { sender, transporter } = require('../config/mail');

const admin = {
	getExaminerDetails: async (accountStatus, pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let data = await examiner.findByAccountStatus(
			accountStatus,
			pageIndex,
			pageSize
		);
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
		let updatedExaminer = await examiner
			.update(examinerId, {
				accountStatus: accountStatus,
			})
			.select({ accountStatus: 1 });
		let userData = await users
			.find({ userDataId: updatedExaminer._id })
			.select({ email: 1 });

		let mailOptions = {
			to: userData.email,
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
