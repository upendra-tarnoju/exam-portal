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
		mobileNumber: '9876543210',
		dob: '2020-10-10',
		studentId: 'abcd1010',
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
