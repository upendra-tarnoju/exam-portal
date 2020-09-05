const initialState = {
	examinerInput: false,
	courses: [],
};

const examinerReducers = (state = initialState, action) => {
	if (action.type === 'set_examiner_input_window') {
		return {
			...state,
			examinerInput: action.status,
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
