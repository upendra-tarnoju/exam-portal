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
	EXAM_DURATION_STATUS: {
		COMPLETE: 'COMPLETE',
		SELECTIVE: 'SELECTIVE',
	},
	EXAM_STATUS: {
		CREATED: 'CREATED',
		DELETED: 'DELETED',
	},
	QUESTION_STATUS: {
		ACTIVE: 'ACTIVE',
	},
};

module.exports = appDefaults;
