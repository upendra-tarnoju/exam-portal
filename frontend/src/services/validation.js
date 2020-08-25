let checkEmptyField = (value) => {
	if (value === '') return '* Required';
	else return '';
};

let validateEmailField = (value) => {
	let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	if (!re.test(value)) return '* Invalid Email';
	else return '';
};

let validateMobileNumber = (value) => {
	let re = /^[0-9\b]+$/;
	if (!re.test(value)) return '* Invalid Email';
	else return '';
};

let validateSignUpPassword = (temp) => {
	let emptyFieldError = checkEmptyField(temp.password);
	if (emptyFieldError !== '') {
		temp.errors.password = emptyFieldError;
	} else if (temp.password.length <= 6) {
		temp.errors.password = 'Minimum password length should be 6';
	}
	return temp;
};

let validateFields = (key, temp) => {
	switch (key) {
		case 'firstName':
			temp['errors'][key] = checkEmptyField(temp[key]);
			return temp;

		case 'lastName':
			temp['errors'][key] = checkEmptyField(temp[key]);
			return temp;

		case 'email':
			temp['errors'][key] = checkEmptyField(temp[key]);
			if (temp['errors'][key] === '') {
				temp['errors'][key] = validateEmailField(temp[key]);
			}
			return temp;

		case 'mobileNumber':
			temp['errors'][key] = checkEmptyField(temp[key]);
			if (temp['errors'][key] === '') {
				temp['errors'][key] = validateMobileNumber(temp[key]);
			}
			return temp;

		default:
			return temp;
	}
};

const signUpFields = (temp) => {
	let error = false;
	let keys = Object.keys(temp);
	for (let index in keys) {
		if (keys[index] === 'password') {
			temp = validateSignUpPassword(temp);
		} else {
			temp = validateFields(keys[index], temp);
		}
	}
	let values = Object.values(temp.errors);
	for (let index in values) {
		if (values[index].length > 1) {
			error = true;
			break;
		}
	}
	return { tempState: temp, error: error };
};

const loginFields = (temp) => {
	let error = false;
	let keys = Object.keys(temp);
	for (let index in keys) {
		if (keys[index] === 'password') {
			let emptyFieldError = checkEmptyField(temp.password);
			if (emptyFieldError !== '') {
				temp.errors.password = emptyFieldError;
			}
		} else {
			temp = validateFields(keys[index], temp);
		}
	}
	let values = Object.values(temp.errors);
	for (let index in values) {
		if (values[index].length > 1) {
			error = true;
			break;
		}
	}
	return { tempState: temp, error: error };
};

export default { signUpFields, loginFields };
