import moment from 'moment';

let formatDate = (date) => {
	let formattedDate = `${date.getFullYear()}-${(
		'0' +
		(date.getMonth() + 1)
	).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
	return formattedDate;
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

var hexValues = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'a',
	'b',
	'c',
	'd',
	'e',
];

let capitalizeName = (name) => {
	return name
		.split(' ')
		.map((data) => data.slice(0, 1).toUpperCase() + data.slice(1, data.length))
		.join(' ');
};

let populateColor = () => {
	let value = '#';

	for (let i = 0; i < 6; i++) {
		let x = Math.round(Math.random() * 14);
		let y = hexValues[x];
		value += y;
	}
	return value;
};

let generateRandomGradient = () => {
	let firstColor = populateColor();
	let secondColor = populateColor();
	let angle = Math.round(Math.random() * 360);

	let gradient = `linear-gradient(${angle}deg, ${firstColor}, ${secondColor})`;
	return gradient;
};

let formatDuration = (startTime, endTime) => {
	let duration = moment(endTime).diff(moment(startTime), 'minutes');
	return `${duration} min`;
};

export default {
	formatDate,
	capitalizeName,
	monthMenu,
	generateRandomGradient,
	formatDuration,
};
