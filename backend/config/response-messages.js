module.exports = {
	EXAMINER_SIGNUP: {
		SUCCESS: {
			STATUS_CODE: 200,
			MSG: 'Your account would be created shortly.You will receive email soon.',
		},
		DUPLICATE_RESOURCE: {
			STATUS_CODE: 409,
			MSG: 'Examiner already existed',
		},
	},
	ACCOUNT_STATUS: {
		DECLINED: {
			STATUS_CODE: 403,
			MSG: 'Your account has been declined. Kindly contact to admin',
		},
		PENDING: {
			STATUS_CODE: 403,
			MSG: 'Your account is not approved',
		},
	},
	INCORRECT_CREDENTIALS: {
		STATUS_CODE: 403,
		MSG: 'Incorrect credentials',
	},
	EXAMINER_COUNT: {
		DECLINED: {
			STATUS_CODE: 200,
			MSG: 'There are no examiners in declined section',
		},
		PENDING: {
			STATUS_CODE: 200,
			MSG: 'There are no examiners in pending section',
		},
	},
	EXAMINER_STATUS: {
		APPROVED: {
			STATUS_CODE: 200,
			MSG: 'Examiner has been approved',
		},
		DECLINED: {
			STATUS_CODE: 200,
			MSG: 'Examiner has been declined',
		},
	},
};
