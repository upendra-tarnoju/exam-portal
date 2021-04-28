const appDefaults = {
	ACCOUNT_TYPE: {
		EXAMINER: 'examiner',
		ADMIN: 'admin',
		STUDENT: 'student',
	},
	ACCOUNT_STATUS: {
		PENDING: 'pending',
		DECLINED: 'declined',
		APPROVED: 'approved',
	},
	EXAMINER_QUERY_TYPE: {
		EXAMINER_COUNT: 'examinerCount',
		LATEST_EXAMINER: 'latestExaminer',
		APPROVED: 'approved',
		PENDING: 'pending',
		DECLINED: 'declined',
	},
	COURSE_STATUS_ENUM: {
		ACTIVE: 'ACTIVE',
		DELETED: 'DELETED',
		BLOCKED: 'BLOCKED',
	},
};

module.exports = appDefaults;
