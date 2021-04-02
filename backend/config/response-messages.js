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
		MONGOOSE_ERROR: {
			STATUS_CODE: 400,
		},
	},
};
