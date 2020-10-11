const initialState = {
	personalDetails: {
		firstName: 'abcd',
		lastName: 'abcd',
		fatherName: 'abcd',
		motherName: 'abcd',
		address: 'abcd',
		gender: 'male',
	},
	examDetails: {
		examCode: [],
		mobileNumber: '9876325410',
		dob: '2020-10-10',
		studentId: 'abcd101',
		email: 'abcd@gmail.com',
		password: 'himanshu',
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
