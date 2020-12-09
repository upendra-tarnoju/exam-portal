import * as Yup from 'yup';
import initialSchema from '../schema/questionSchema';

let formatDate = (date) => {
	let formattedDate = `${date.getFullYear()}-${(
		'0' +
		(date.getMonth() + 1)
	).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
	return formattedDate;
};

let formatTime = (time) => {
	let formattedTime = `${('0' + time.getHours()).slice(-2)}:${(
		'0' + time.getMinutes()
	).slice(-2)}`;
	return formattedTime;
};

let updateExaminerCount = (
	prevAccountStatus,
	newAccountStatus,
	examinerCount
) => {
	examinerCount[newAccountStatus] = examinerCount[newAccountStatus] + 1;
	examinerCount[prevAccountStatus] = examinerCount[prevAccountStatus] - 1;
	return examinerCount;
};

let monthMenu = [
	'January',
	'Feburary',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

let capitalizeName = (name) => {
	return name
		.split(' ')
		.map(
			(data) => data.slice(0, 1).toUpperCase() + data.slice(1, data.length)
		)
		.join(' ');
};

let optionType = [
	{ value: 'single', label: 'Single' },
	{ value: 'multiple', label: 'Multiple' },
];

let totalOptionsList = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
];

let correctAnswerList = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
	{ label: 'Option 4', value: 'option4' },
];

let setOptionValidationSchema = (length) => {
	let customSchema = {};
	for (let i = 0; i < length; i++) {
		customSchema[`option${i + 1}`] = Yup.string().required(
			'Option is required'
		);
	}
	let mergedSchema = { ...customSchema, ...initialSchema };

	return mergedSchema;
};

export default {
	formatDate,
	formatTime,
	updateExaminerCount,
	capitalizeName,
	setOptionValidationSchema,
	optionType,
	totalOptionsList,
	correctAnswerList,
	monthMenu,
};
