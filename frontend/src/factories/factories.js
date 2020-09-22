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

export default { formatDate, formatTime };
