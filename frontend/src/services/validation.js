let validateEmptyFields = (state) => {
	let error = false;
	for (let key in state) {
		if (state[key].value === '') {
			state[key].error = '* Required';
			error = true;
		}
	}

	return { error: error, tempState: state };
};

let validateSignUpFields = (state) => {
	let error = false;
	Object.entries(state).forEach((item) => {
		let key = item[0];
		let value = item[1].value;
		if (value === '') {
			error = true;
			item[1].error = '* Required';
		} else if (key === 'email') {
			let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
			if (!re.test(value)) {
				error = true;
				item[1].error = 'Invalid Email';
			} else item[1].error = '';
		} else if (key === 'mobileNumber') {
			var re = /^[0-9\b]+$/;
			if (!re.test(value)) {
				item[1].error = 'Invalid Mobile number';
			} else item[1].error = '';
		} else if (key === 'password') {
			if (value.length <= 6) {
				error = true;
				item[1].error = 'Minimum password length should be 6';
			} else item[1].error = '';
		}
	});

	return { error: error, tempState: state };
};

const validateInputs = (state, validationMethod) => {
	let tempState;
	if (validationMethod === 'login') {
		tempState = validateEmptyFields(state);
	} else if (validationMethod === 'signup') {
		tempState = validateSignUpFields(state);
	}
	return tempState;
};

export default validateInputs;
