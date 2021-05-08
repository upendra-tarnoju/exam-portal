const initialState = {
	courses: [],
	examCode: '',
	questions: [],
};

const examinerReducers = (state = initialState, action) => {
	if (action.type === 'set_courses') {
		return {
			...state,
			courses: action.courses,
		};
	}
	return state;
};

export default examinerReducers;
