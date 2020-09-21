const initialState = {
	selectedExamIndex: '',
	examsList: [],
	examDetails: {
		subject: '',
		course: '',
		examCode: '',
		password: '',
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
	} else if (action.type === 'clear_exam_details_fields') {
		return {
			...state,
			examDetails: {
				...state.examDetails,
				course: '',
				examCode: '',
				password: '',
				subject: '',
			},
		};
	} else if (action.type === 'set_exam_list') {
		return {
			...state,
			examsList: action.examList,
		};
	}
	return state;
};

export default examReducers;
