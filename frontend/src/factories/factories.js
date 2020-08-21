const { data } = require('jquery');

mapSignUpStates = (state) => {
	for (data in state) {
		console.log(data);
	}
};

module.exports = {
	mapSignUpStates,
};
