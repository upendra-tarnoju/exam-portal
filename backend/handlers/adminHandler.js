const { users, examiner, student, exam } = require('../models');
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
			text: `Your email id ${userData.email} has been ${
				updatedExaminer.accountStatus === 'approved'
					? 'successfully registered'
					: 'declined'
			}  as examiner`,
		};
		transporter.sendMail(mailOptions);
		return {
			msg: `Examiner ${updatedExaminer.accountStatus}`,
			accountStatus: updatedExaminer.accountStatus,
			_id: updatedExaminer._id,
		};
	},

	getDashboardCardDetails: async () => {
		try {
			let criteria = {};

			let totalExaminers = await examiner.countExaminers(criteria);
			let totalExams = await exam.countExams(criteria);
			let totalStudents = await student.countStudents(criteria);

			return {
				status: 200,
				data: { totalExaminers, totalExams, totalStudents },
			};
		} catch (err) {
			return { status: 400, data: { err } };
		}
	},

	getUnexpiredExamDetails: async (minDate, maxDate) => {
		let data = await exam.findByExamMonth(minDate, maxDate);
		return data;
	},

	getLatestPendingExaminers: async (pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let data = await users
			.findLatest24HoursExaminers()
			.skip(pageIndex)
			.limit(pageSize);

		let allExaminers = await users.findLatest24HoursExaminers();
		return { count: allExaminers.length, examiners: data };
	},
};

module.exports = admin;
