const { users, examiner, student, exam } = require('../models');
const { sender, transporter } = require('../config/mail');
const APP_DEFAULTS = require('../config/app-defaults');
const RESPONSE_MESSAGES = require('../config/response-messages');

const admin = {
	getExaminerDetails: async (accountStatus, pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let examinerDetails = await users.findByAccountStatus(
			accountStatus,
			pageIndex,
			pageSize
		);
		return { status: 200, data: examinerDetails };
	},

	getExaminerCount: async () => {
		try {
			let examinerData = await users.findByUserType(
				APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER
			);
			return { status: 200, data: examinerData };
		} catch (err) {
			throw err;
		}
	},

	approveOrDeclineExaminer: async (userId, accountStatus) => {
		let updatedExaminer = await users.update(userId, {
			status: accountStatus,
		});

		let mailOptions = {
			to: updatedExaminer.email,
			from: sender,
			subject: 'Examiner confirmation mail',
			text: `Your email id ${updatedExaminer.email} has been ${
				updatedExaminer.status === APP_DEFAULTS.ACCOUNT_STATUS.APPROVED
					? 'successfully registered'
					: 'declined'
			}  as examiner`,
		};

		transporter.sendMail(mailOptions);

		let response;
		if (updatedExaminer.status === APP_DEFAULTS.ACCOUNT_STATUS.DECLINED) {
			response = RESPONSE_MESSAGES.EXAMINER_STATUS.DECLINED;
		} else {
			response = RESPONSE_MESSAGES.EXAMINER_STATUS.APPROVED;
		}

		return {
			status: response.STATUS_CODE,
			data: {
				msg: response.MSG,
				accountStatus: updatedExaminer.status,
				_id: updatedExaminer._id,
			},
		};
	},

	getDashboardCardDetails: async () => {
		try {
			let criteria = {};
			criteria = { userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER };
			let totalExaminers = await users.countDocuments(criteria);

			criteria = {};
			let totalExams = await exam.countExams(criteria);
			let totalStudents = await student.countStudents(criteria);

			return {
				status: 200,
				data: {
					totalExaminers,
					totalExams,
					totalStudents,
				},
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
		try {
			pageIndex = pageIndex * pageSize;
			let pendingExaminers = await users
				.findLatest24HoursExaminers()
				.skip(pageIndex)
				.limit(pageSize);

			let allExaminers = await users.findLatest24HoursExaminers();
			return {
				status: 200,
				data: { count: allExaminers.length, examiners: pendingExaminers },
			};
		} catch (err) {
			throw err;
		}
	},
};

module.exports = admin;
