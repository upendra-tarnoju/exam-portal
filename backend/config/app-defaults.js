const appDefaults = {
	DATABASE_MODEL: {
		COURSE: 'course',
		EXAMINER_COURSES: 'examinerCourses',
		USERS: 'users',
	},
	ACCOUNT_TYPE: {
		EXAMINER: 'examiner',
		ADMIN: 'admin',
		STUDENT: 'student',
		SUB_ADMIN: 'subAdmin',
	},
	ACCOUNT_STATUS: {
		PENDING: 'pending',
		DECLINED: 'declined',
		APPROVED: 'approved',
		ACTIVE: 'active',
		DELETED: 'deleted',
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
		ACTIVE: 'ACTIVE',
		INCOMPLETE_QUESTIONS: 'INCOMPLETE_QUESTIONS',
		BLOCKED: 'BLOCKED',
	},
	QUESTION_STATUS: {
		ACTIVE: 'ACTIVE',
		INACTIVE: 'INACTIVE',
		DELETED: 'DELETED',
	},
	GENDER: {
		MALE: 'male',
		FEMALE: 'female',
		OTHER: 'other',
	},
	ASSIGNED_EXAM_STATUS: {
		BLOCKED: 'BLOCKED',
		DELETED: 'DELETED',
		ACTIVE: 'ACTIVE',
		SUBMITTED: 'SUBMITTED',
	},
	OPTION_TYPE: {
		SINGLE: 'single',
		MULTIPLE: 'multiple',
	},
};

module.exports = appDefaults;
