const initialState = {
	selectedExamIndex: '',
	examsList: [],
	examDetails: {},
};

const examReducers = (state = initialState, action) => {
	if (action.type === 'set_exam_details') {
		return {
			...state,
			examDetails: {
				...action.data.examDetails,
				examMarks: action.data.examMarks,
			},
		};
	}
	return state;
};

export default examReducers;
