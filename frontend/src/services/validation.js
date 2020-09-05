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
	} else {
		temp.errors.password = '';
	}
	return temp;
};

let validateExamDate = (temp) => {
	let selectedDate = temp.examDate;
	let currentDate = new Date();
	currentDate = `${currentDate.getFullYear()}-${(
		'0' +
		(currentDate.getMonth() + 1)
	).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
	if (selectedDate < currentDate) {
		console.log('error');
		return "* Selected date cannot be less than today's date";
	}
	return '';
};

let validatePassingMarks = (temp) => {
	let totalMarks = parseInt(temp.totalMarks, 10);
	let passingMarks = parseInt(temp.passingMarks, 10);
	if (totalMarks < passingMarks) {
		return '* Passing marks cannot be greater than total marks';
	} else return '';
};

let validateExamTime = (temp) => {
	let examTimeError = {};
	let currentDate = new Date();
	let currentTime = `${('0' + currentDate.getHours()).slice(-2)}:${(
		'0' + currentDate.getMinutes()
	).slice(-2)}`;
	currentDate = `${currentDate.getFullYear()}-${(
		'0' +
		(currentDate.getMonth() + 1)
	).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
	let startTime = temp.startTime;

	if (currentDate === temp.examDate) {
		if (currentTime <= startTime) examTimeError['startTime'] = '';
		else examTimeError['startTime'] = '* Invalid start time';
	} else if (currentDate < temp.examDate) {
		examTimeError['startTime'] = '';
	} else {
		examTimeError['startTime'] = '* Invalid start time';
	}

	if (temp.endTime < temp.startTime) {
		examTimeError['endTime'] = '* End time cannot be less than start time';
	} else examTimeError['endTime'] = '';

	return examTimeError;
};

let validateExamDuration = (temp) => {
	let duration = temp.duration;
	let startHour = temp.startTime.split(':')[0];
	let endHour = temp.endTime.split(':')[0];
	let diffHour = (endHour - startHour) * 60;
	if (duration <= diffHour) temp.errors.duration = '';
	else temp.errors.duration = '* Invalid duration';
	return temp;
};

let validateFields = (key, temp) => {
	switch (key) {
		case 'subject':
		case 'course':
		case 'examCode':
		case 'firstName':
		case 'lastName':
		case 'totalMarks':
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

		case 'duration':
			if (!temp.hideDuration) {
				temp['errors'][key] = checkEmptyField(temp[key]);
				if (temp['errors'][key] === '') {
					temp = validateExamDuration(temp);
				}
			}
			return temp;
		case 'passingMarks':
			temp['errors'][key] = checkEmptyField(temp[key]);
			if (temp['errors'][key] === '') {
				temp['errors'][key] = validatePassingMarks(temp);
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

const examDetailFields = (temp) => {
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

const examDurationFields = (temp) => {
	let error = false;
	let keys = Object.keys(temp);
	for (let index in keys) {
		let key = keys[index];
		if (key === 'password') {
		} else if (key === 'examDate') {
			temp.errors.examDate = validateExamDate(temp);
		} else if (key === 'startTime' || key === 'endTime') {
			let examTimeError = validateExamTime(temp);
			temp['errors'][key] = examTimeError[key];
		} else {
			temp = validateFields(key, temp);
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

const updateExamFields = (temp) => {
	let errorObject = {};
	let error;
	let keys = Object.keys(temp);
	for (let index in keys) {
		let key = keys[index];
		if (
			key === 'subject' ||
			key === 'examCode' ||
			key === 'totalMarks' ||
			key === 'passingMarks'
		) {
			error = checkEmptyField(temp[key]);
			if (error) {
				errorObject[key] = `${error} ${key}`;
			} else errorObject[key] = '';
		}
		if (key === 'passingMarks') {
			if (errorObject[key] === '') {
				errorObject[key] = validatePassingMarks(temp);
			}
		} else if (key === 'examDate') {
			errorObject[key] = validateExamDate(temp);
		} else if (key === 'startTime' || key === 'endTime') {
			errorObject[key] = validateExamTime(temp)[key];
		}
	}

	let values = Object.values(errorObject);
	for (let index in values) {
		if (values[index].length > 1) {
			error = true;
			break;
		}
	}
	return { errorObject: errorObject, error: error };
};

export default {
	signUpFields,
	loginFields,
	examDetailFields,
	examDurationFields,
	updateExamFields,
};
