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
	COURSES: {
		CREATE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'New course created',
			},
			DUPLICATE_RESOURCE: {
				STATUS_CODE: 409,
				MSG: 'Course already existed',
			},
		},
		DELETE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Course deleted successfully',
			},
			INVALID_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid course id',
			},
		},
		UPDATE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Course updated successfully',
			},
			INVALID_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid course id',
			},
		},
	},
	EXAM: {
		CREATE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'New exam created successfully',
			},
		},
		DELETE: {
			INVALID_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid exam id',
			},
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Exam has been deleted',
			},
		},
		UPDATE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Exam updated successfully',
			},
			INVALID_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid exam id',
			},
			INVALID_PASSWORD: {
				STATUS_CODE: 401,
				MSG: 'Incorrect current password',
			},
		},
	},
	QUESTION: {
		CREATE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Question is added to exam successfully',
			},
		},
	},
};
