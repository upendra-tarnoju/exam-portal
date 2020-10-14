const initialState = {
	personalDetails: {
		firstName: '',
		lastName: '',
		fatherName: '',
		motherName: '',
		address: '',
		gender: '',
	},
	examDetails: {
		mobileNumber: '',
		dob: '',
		studentId: '',
		email: '',
		password: '',
	},
};

const studentReducer = (state = initialState, action) => {
	if (action.type === 'change_student_fields') {
		return {
			...state,
			personalDetails: action.data,
		};
	} else if (action.type === 'exam_detail_fields') {
		return {
			...state,
			examDetails: {
				...state.examDetails,
				[action.key]: action.value,
			},
		};
	}
	return state;
};

export default studentReducer;
