module.exports = {
	EXAMINER_SIGNUP: {
		SUCCESS: {
			STATUS_CODE: 200,
			MSG: 'Examiner account would be created shortly. Password will be sent to registered email',
		},
		DUPLICATE_RESOURCE: {
			STATUS_CODE: 409,
			MSG: 'Examiner already existed',
		},
	},
	REMOVE_EXAMINER: {
		SUCCESS: {
			STATUS_CODE: 200,
			MSG: 'Examiner has been removed',
		},
		INVALID_ID: {
			STATUS_CODE: 400,
			MSG: 'Invalid examiner Id',
		},
	},
	SUB_ADMIN_SIGNUP: {
		SUCCESS: {
			STATUS_CODE: 200,
			MSG: 'Your account would be created shortly.You will receive email soon.',
		},
		DUPLICATE_RESOURCE: {
			STATUS_CODE: 409,
			MSG: 'User already existed',
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
			TOTAL_MARKS_LIMIT: {
				STATUS_CODE: 400,
				MSG: 'You have exceeded total marks limit',
			},
		},
		DELETE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Question is deleted from exam successfully',
			},
			INVALID_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid question id',
			},
		},
		UPDATE: {
			STATUS: {
				ACTIVE: {
					STATUS_CODE: 200,
					MSG: 'Question has been set to active',
				},
				INACTIVE: {
					STATUS_CODE: 200,
					MSG: 'Question has been set to inactive',
				},
				INVALID_ID: {
					STATUS_CODE: 400,
					MSG: 'Invalid question id',
				},
			},
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Question updated successfully',
			},
			TOTAL_MARKS_LIMIT: {
				STATUS_CODE: 400,
				MSG: 'You have exceeded total marks limit',
			},
			INVALID_EXAM_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid exam Id',
			},
			INVALID_QUESTION_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid question id',
			},
		},
	},
	STUDENT: {
		CREATE: {
			EXISITING_STUDENT: {
				STATUS_CODE: 409,
				MSG: 'Student Id already exited',
			},
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'New student created successfully',
			},
		},
		INVALID_STUDENT_ID: {
			STATUS_CODE: 400,
			MSG: 'Invalid student id',
		},
		FILE_UPLOAD: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'File uploaded successfully',
			},
		},
	},
	SUB_ADMIN: {
		INVALID_ID: {
			STATUS_CODE: 400,
			MSG: 'Invalid sub admin id',
		},
		STATUS_APPROVED: {
			STATUS_CODE: 200,
			MSG: 'Sub admin has been approved',
		},
		STATUS_DECLINED: {
			STATUS_CODE: 200,
			MSG: 'Sub admin has been declined',
		},
	},
	EXCEL_FILE_UPLOAD: {
		EMPTY_FILE: {
			STATUS_CODE: 400,
			MSG: 'File data cannot be empty',
		},
		INVALID_KEY: {
			STATUS_CODE: 400,
			MSG: 'Invalid key. Make sure you do not change the headers of file',
		},
		MISSING_KEY: {
			STATUS_CODE: 400,
			MSG: 'Missing headers in the file',
		},
	},
};
