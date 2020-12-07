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

export default {
	formatDate,
	formatTime,
	updateExaminerCount,
	monthMenu,
	capitalizeName,
	optionType,
	totalOptionsList,
};
