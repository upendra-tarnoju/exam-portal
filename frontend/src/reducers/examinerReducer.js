const initialState = {
	examinerInput: false,
	examinerTab: '',
	examinerHeading: '',
	courses: [],
};

const examinerReducers = (state = initialState, action) => {
	if (action.type === 'set_examiner_input_window') {
		return {
			...state,
			examinerInput: action.status,
		};
	} else if (action.type === 'set_examiner_tab') {
		return {
			...state,
			examinerTab: action.tab,
			examinerHeading: action.heading,
		};
	} else if (action.type === 'set_courses') {
		return {
			...state,
			courses: action.courses,
		};
	}
	return state;
};

export default examinerReducers;
