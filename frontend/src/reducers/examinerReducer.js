const initialState = {
	courses: [],
	questionImage: '',
};

const examinerReducers = (state = initialState, action) => {
	if (action.type === 'set_courses') {
		return {
			...state,
			courses: action.courses,
		};
	} else if (action.type === 'question_image') {
		return {
			...state,
			questionImage: action.image,
		};
	}
	return state;
};

export default examinerReducers;
