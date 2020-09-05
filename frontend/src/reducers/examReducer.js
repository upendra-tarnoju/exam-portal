import moment from 'moment';
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
		subject: { value: '', isChanged: false },
		examCode: { value: '', isChanged: false },
		examDate: { value: '', isChanged: false },
		totalMarks: { value: '', isChanged: false },
		passingMarks: { value: '', isChanged: false },
		startTime: { value: '', isChanged: false },
		endTime: { value: '', isChanged: false },
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
		let inputs = action.inputs;
		let startTime = moment(inputs.startTime).format('HH:MM');
		let endTime = moment(inputs.endTime).format('HH:MM');
		return {
			...state,
			editExamInputs: {
				subject: inputs.subject,
				examCode: inputs.examCode,
				examDate: inputs.examDate,
				totalMarks: inputs.totalMarks,
				passingMarks: inputs.passingMarks,
				startTime: startTime,
				endTime: endTime,
			},
		};
	}
	return state;
};

export default examReducers;
