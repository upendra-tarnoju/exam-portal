const initialState = {
	examinerInput: false,
};

const examinerReducers = (state = initialState, action) => {
	if (action.type === 'set_examiner_input_window') {
		return {
			...state,
			examinerInput: action.status,
		};
	}
	return state;
};

export default examinerReducers;
