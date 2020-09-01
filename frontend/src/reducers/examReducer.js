const initialState = {
	editExam: false,
	selectedExamIndex: '',
	examsList: [],
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
	editExamInputs: {
		subject: '',
		examCode: '',
		examDate: '',
		totalMarks: '',
		passingMarks: '',
		startTime: '',
		endTime: '',
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
	} else if (action.type === 'edit_exam_status') {
		return {
			...state,
			editExam: action.status,
			selectedExamIndex: action.index,
		};
	} else if (action.type === 'set_exam_list') {
		return {
			...state,
			examsList: action.examList,
		};
	} else if (action.type === 'edit_exam_inputs') {
		return {
			...state,
			editExamInputs: {
				...state.editExamInputs,
				[action.key]: action.value,
			},
		};
	} else if (action.type === 'set_exam_inputs') {
		return {
			...state,
			editExamInputs: action.inputs,
		};
	}
	return state;
};

export default examReducers;
