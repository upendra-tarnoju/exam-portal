const initialState = {
	examinerInput: false,
	courses: [],
	examCode: '',
	questions: [],
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
	} else if (action.type === 'add_question') {
		return {
			...state,
			questions: [...state.questions, action.question],
			marks: {
				total: state.marks.total,
				used: state.marks.used + action.question.questionMarks,
				left: state.marks.left - action.question.questionMarks,
			},
		};
	}
	return state;
};

export default examinerReducers;
