const initialState = {
	examDetails: {
		subject: '',
		course: '',
		examCode: '',
		password: '',
		errors: {
			subject: '',
			course: '',
			examCode: '',
			password: '',
		},
	},
};

const examReducers = (state = initialState, action) => {
	if (action.type === 'set_exam_details') {
		return {
			...state,
			examDetails: {
				...state.examDetails,
				[action.key]: action.value,
			},
		};
	} else if (action.type === 'set_exam_details_errors') {
		return {
			...state,
			examDetails: {
				...state.examDetails,
				errors: action.errors,
			},
		};
	}
	return state;
};

export default examReducers;
