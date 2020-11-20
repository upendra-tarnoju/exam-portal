import moment from 'moment';

let checkEmptyField = (value) => {
	if (value === '') return '* Required';
	else return '';
};

let validateQuestions = (temp) => {
	for (let i = 0; i < temp.length; i++) {
		let key = Object.keys(temp[i])[0];
		temp[i][key].error = checkEmptyField(temp[i][key].value);
	}
	return temp;
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
		if (
			key !== 'options' &&
			key !== 'image' &&
			key !== 'editExam' &&
			key !== 'snackbar' &&
			key !== 'deleteModal'
		) {
			if (temp[key].error !== '') {
				error = true;
			}
		}
	}
	return { tempState: temp, error: error };
};

let validateStartTime = (examDate, startTime, endTime) => {
	let currentDate = new Date();
	let currentTime = moment(currentDate).format('h:mma');

	startTime = moment(startTime).format('h:mma');
	endTime = moment(endTime).format('h:mma');

	currentDate = moment(currentDate).format('YYYY-MM-DD');
	examDate = moment(examDate).format('YYYY-MM-DD');

	let validExamDate = moment(currentDate).isSame(examDate);
	if (validExamDate) {
		let validStartTime = moment(currentTime, 'h:mma').isBefore(
			moment(startTime, 'h:mma')
		);
		if (validStartTime) return true;
		else return false;
	}

	validExamDate = moment(currentDate).isBefore(examDate);
	if (validExamDate) {
		let validStartTime = moment(startTime, 'h:mma').isBefore(
			moment(endTime, 'h:mma')
		);
		if (validStartTime) return true;
		else return false;
	}
	return false;
};

let validateExamDuration = (duration, startTime, endTime) => {
	duration = parseInt(duration, 10);

	let startHour = new Date();
	startHour.setTime(Date.parse(startTime));

	startHour = startHour.getUTCHours();

	let endHour = new Date();
	endHour.setTime(Date.parse(endTime));

	endHour = endHour.getUTCHours();
	let diffHour = (endHour - startHour) * 60;

	if (duration <= diffHour) return true;
	else return false;
};

export default {
	createQuestionFields,
	validateStartTime,
	validateExamDuration,
};
