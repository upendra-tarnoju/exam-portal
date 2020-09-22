let checkEmptyField = (value) => {
	if (value === '') return '* Required';
	else return '';
};

let validateExamPassword = (temp) => {
	let error = '';
	temp['current'].msg = checkEmptyField(temp['current'].value);
	temp['new'].msg = checkEmptyField(temp['new'].value);
	temp['reTypeNew'].msg = checkEmptyField(temp['reTypeNew'].value);
	if (temp['current'].msg || temp['new'].msg || temp['reTypeNew'].msg) {
		error = 'error';
	}
	if (temp['new'].value !== '' && temp['reTypeNew'].value !== '') {
		if (temp['new'].value.length < 6) {
			error = 'error';
			temp['new'].msg = 'Minimum password length should be 6';
		} else error = '';
		if (temp['new'].value !== temp['reTypeNew'].value) {
			error = 'error';
			temp['reTypeNew'].msg = 'Password does not matched';
		} else error = '';
	}
	temp['error'] = error;
	return temp;
};

let validateQuestions = (temp) => {
	for (let i = 0; i < temp.length; i++) {
		let key = Object.keys(temp[i])[0];
		temp[i][key].error = checkEmptyField(temp[i][key].value);
	}
	return temp;
};

const updateExamFields = (temp) => {
	let key = Object.keys(temp)[0];
	switch (key) {
		case 'subject':
		case 'examCode':
		case 'totalMarks':
			temp.error = checkEmptyField(temp[key]);
			return temp;

		case 'password':
			temp = validateExamPassword(temp.password);
			return temp;

		default:
			temp.error = '';
			return temp;
	}
};

const createQuestionFields = (temp) => {
	let keys = Object.keys(temp);
	let error = false;
	for (let index in keys) {
		let key = keys[index];
		if (key === 'question' || key === 'optionsType') {
			temp[key].error = checkEmptyField(temp[key].value);
			if (temp[key].error !== '') {
				error = true;
			}
		} else if (key === 'options' || key === 'correctAnswer') {
			if (temp[key].value.length === 0) {
				temp[key].error = '* Required';
			} else {
				temp[key].error = '';
				if (key === 'options')
					temp[key].value = validateQuestions(temp[key].value);
			}
		} else if (key === 'correctAnswer') {
			if (temp[key].value.length === 0) {
				temp[key].error = '* Required';
			} else {
				temp[key].error = '';
			}
		}
	}
	for (let index in keys) {
		let key = keys[index];
		if (key !== 'options' && key !== 'image' && key !== 'editExam') {
			if (temp[key].error !== '') {
				error = true;
			}
		}
	}
	return { tempState: temp, error: error };
};

export default {
	updateExamFields,
	createQuestionFields,
};
