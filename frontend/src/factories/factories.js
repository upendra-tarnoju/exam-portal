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

export default { formatDate, formatTime, updateExaminerCount };
