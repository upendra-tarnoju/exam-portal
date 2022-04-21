import moment from 'moment';

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
	validateStartTime,
	validateExamDuration,
};
