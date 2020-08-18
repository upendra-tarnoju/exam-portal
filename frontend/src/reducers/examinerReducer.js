const initialState = {
	examinerInput: false,
	examinerTab: '',
	examinerHeading: '',
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
	}
	return state;
};

export default examinerReducers;
