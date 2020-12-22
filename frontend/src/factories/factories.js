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

let negativeMarksList = [
	{ value: 0, label: '0' },
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
];

let correctAnswerList = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
	{ label: 'Option 4', value: 'option4' },
];

let requiredCSVHeaders = [
	'address',
	'dob',
	'email',
	'fatherName',
	'firstName',
	'gender',
	'lastName',
	'mobileNumber',
	'motherName',
	'password',
	'studentId',
];

let emailRegex = new RegExp(
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
);

let capitalizeName = (name) => {
	return name
		.split(' ')
		.map(
			(data) => data.slice(0, 1).toUpperCase() + data.slice(1, data.length)
		)
		.join(' ');
};

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

let calculateOptions = (obj) => {
	let arr = [];
	Object.keys(obj).forEach((data) => {
		if (!isNaN(data.slice(-1))) {
			arr.push(data);
		}
	});
	return arr;
};

let validateHeaders = (headers) => {
	headers = headers.split(',');
	for (let i = 0; i < headers.length; i++) {
		let header = `${headers[i]}`;
		if (requiredCSVHeaders.indexOf(header.trim()) == -1) {
			return false;
		}
	}
	return true;
};

let validateCSVFields = (fields) => {
	let validationMessage;
	for (let i = 0; i < fields.length - 1; i++) {
		let studentData = fields[i].split(',');
		if (studentData.includes('')) {
			validationMessage = 'Found empty row field';
		} else if (!emailRegex.test(studentData[9])) {
			validationMessage = `Invalid email Id for student Id (${studentData[0]})`;
		}
	}
	return validationMessage;
};

let validateCSVFile = (csv) => {
	let lines = csv.split('\n');
	let validationMessage;
	let headerStatus = validateHeaders(lines[0]);
	if (!headerStatus) {
		validationMessage =
			'File does not contain required fields or fields contains wrong header name';
		return validationMessage;
	}
	let studentData = lines.splice(1);
	let fieldStatus = validateCSVFields(studentData);
	if (fieldStatus) {
		return fieldStatus;
	}
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
	negativeMarksList,
	calculateOptions,
	validateCSVFile,
};
