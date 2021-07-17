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
			DUPLICATE_RESOURCE: {
				STATUS_CODE: 409,
				MSG: 'Course already existed',
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
		EXAM_PASSWORD: {
			INVALID_EXAM_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid exam id',
			},
			INVALID_PASSWORD: {
				STATUS_CODE: 400,
				MSG: 'Wrong exam credentials',
			},
			SUBMITTED_EXAM: {
				STATUS_CODE: 400,
				MSG: 'You cannot give exam more than once',
			},
		},
		EXAM_QUESTION: {
			INVALID_EXAM_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid exam Id',
			},
			BLOCKED_EXAM: {
				STATUS_CODE: 200,
				MSG: 'You are not allowed to give this exam',
			},
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Answer saved successfully',
			},
			SUBMITTED: {
				STATUS_CODE: 200,
				MSG: 'Exam have been submitted successfully',
			},
			INVALID_QUESTION_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid question Id',
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
			EXISITING_STUDENT_ID: {
				STATUS_CODE: 409,
				MSG: 'Student Id already existed',
			},
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'New student created successfully',
			},
			EXISTING_EMAIL: {
				STATUS_CODE: 409,
				MSG: 'Email ID already existed',
			},
			EXISTING_MOBILE_NUMBER: {
				STATUS_CODE: 409,
				MSG: 'Mobile number already existed',
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
		DELETE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Student has been removed successfully',
			},
			INVALID_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid student id',
			},
		},
		UPDATE: {
			EXISTING_STUDENT_ID: {
				STATUS_CODE: 400,
				MSG: 'Student Id already existed',
			},
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Student has been updated successfully',
			},
			INVALID_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid student id',
			},
			EXISTING_EMAIL: {
				STATUS_CODE: 400,
				MSG: 'Email ID already existed',
			},
			EXISTING_MOBILE_NUMBER: {
				STATUS_CODE: 400,
				MSG: 'Mobile number already existed',
			},
			PASSWORD: {
				STATUS_CODE: 200,
				MSG: 'Student password is updated successfully',
			},
		},
		BLOCK_OR_UNBLOCK: {
			BLOCK: {
				STATUS_CODE: 200,
				MSG: 'Student has been blocked from attempting exam',
			},
			UNBLOCK: {
				STATUS_CODE: 200,
				MSG: 'Student is allowed to attempt exam',
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
	ERROR_IN_EXECUTION: {
		STATUS_CODE: 500,
		MSG: 'Something went wrong',
	},
	DB_ERROR: {
		STATUS_CODE: 500,
		MSG: 'Some error is caused in db',
	},
	ASSIGN_STUDENT: {
		SUCCESS: {
			STATUS_CODE: 200,
			MSG: 'Students have been assigned to exam',
		},
		DELETE: {
			SUCCESS: {
				STATUS_CODE: 200,
				MSG: 'Student has been removed from exam',
			},
			INVALID_ID: {
				STATUS_CODE: 400,
				MSG: 'Invalid assigned student Id',
			},
		},
	},
	UPDATE_ADMIN_SETTING: {
		SUCCESS: {
			STATUS_CODE: 200,
			MSG: 'Settings updated successfully',
		},
	},
	SEND_EMAIL: {
		SUCCESS: {
			STATUS_CODE: 200,
			MSG: 'Email has been sent successfully',
		},
	},
};
