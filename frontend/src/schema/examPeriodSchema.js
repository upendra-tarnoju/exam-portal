import * as Yup from 'yup';

let currentDate = new Date();
currentDate = `${currentDate.getFullYear()}-${(
	'0' +
	(currentDate.getMonth() + 1)
).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;

let validateStartTime = (examDate, startTime) => {
	let currentDate = new Date();

	let currentTime = `${('0' + currentDate.getHours()).slice(-2)}:${(
		'0' + currentDate.getMinutes()
	).slice(-2)}`;

	currentDate = `${currentDate.getFullYear()}-${(
		'0' +
		(currentDate.getMonth() + 1)
	).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;

	examDate = `${examDate.getFullYear()}-${(
		'0' +
		(examDate.getMonth() + 1)
	).slice(-2)}-${('0' + examDate.getDate()).slice(-2)}`;

	if (currentDate === examDate) {
		if (currentTime <= startTime) return true;
		else return false;
	} else if (currentDate < examDate) return true;
	else return false;
};

let validateExamDuration = (duration, startTime, endTime) => {
	duration = parseInt(duration, 10);
	let startHour = startTime.split(':')[0];
	let endHour = endTime.split(':')[0];

	let diffHour = (endHour - startHour) * 60;

	if (duration <= diffHour) return true;
	else return false;
};

let schema = Yup.object({
	totalMarks: Yup.string()
		.matches(/^[0-9\b]+$/, 'Invalid total marks')
		.min(1)
		.required('Total marks is required'),
	passingMarks: Yup.number()
		.required('Passing marks is required')
		.max(
			Yup.ref('totalMarks'),
			'Passing marks should not be greater than total marks'
		),
	examDate: Yup.date()
		.min(currentDate, `Selected date cannot be less than today's date`)
		.required('Required exam date'),
	startTime: Yup.string()
		.required('Required Start time')
		.test('', 'Invalid start time', function (startTime) {
			let { examDate } = this.parent;
			let boolState = validateStartTime(examDate, startTime);
			return boolState;
		}),
	endTime: Yup.string()
		.required('Required End time')
		.test('', 'End time cannot be less than start time', function (endTime) {
			let { startTime } = this.parent;
			if (endTime < startTime) return false;
			else return true;
		}),
	hideDuration: Yup.bool(),
	duration: Yup.string()
		.matches(/^[0-9\b]+$/, 'Invalid exam duration')
		.test('', 'Exam duration is required', function (duration) {
			let { hideDuration } = this.parent;
			if (!hideDuration) {
				if (duration === undefined) return false;
				else return true;
			} else return true;
		})
		.test('', 'Invalid exam duration', function (duration) {
			let { startTime, endTime, hideDuration } = this.parent;
			if (!hideDuration) {
				let boolState = validateExamDuration(duration, startTime, endTime);
				return boolState;
			} else return true;
		}),
});

export default schema;
