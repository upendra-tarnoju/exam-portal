import * as Yup from 'yup';
import moment from 'moment';

import factories from '../../factories/factories';

let currentDate = new Date();

currentDate = factories.formatDate(currentDate);

let validateStartTime = (examDate, startTime) => {
	let currentDate = moment();
	let formattedExamDate = moment(examDate);
	let formattedExamTime = moment(startTime);

	if (currentDate.isSame(formattedExamDate, 'date')) {
		if (currentDate.diff(formattedExamTime, 'milliseconds') < 0) {
			return true;
		}
		return false;
	} else if (currentDate.isBefore(formattedExamDate, 'date')) {
		return true;
	}
	return false;
};

let validateExamDuration = (duration, startTime, endTime) => {
	duration = parseInt(duration, 10);

	let formattedStartTime = moment(startTime);
	let formattedEndTime = moment(endTime);

	let diff = formattedEndTime.diff(formattedStartTime, 'minutes');
	if (duration <= diff) return true;
	else return false;
};

const schema = Yup.object({
	examDate: Yup.date()
		.min(currentDate, `Selected date cannot be less than today's date`)
		.required('Required exam date')
		.nullable(),
	startTime: Yup.date()
		.required('Start time is required')
		.nullable(true)
		.test('', 'Invalid start time', function (startTime) {
			let { examDate } = this.parent;
			let boolState = validateStartTime(examDate, startTime);
			return boolState;
		}),
	endTime: Yup.date()
		.required('End time is required')
		.nullable(true)
		.test('', 'End time cannot be less than start time', function (endTime) {
			let { startTime } = this.parent;
			if (endTime < startTime) return false;
			else return true;
		}),
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
