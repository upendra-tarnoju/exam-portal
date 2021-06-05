const { validationResult } = require('express-validator');

const requestValidator = (validations) => {
	return async (req, res, next) => {
		for (let validation of validations) {
			const result = await validation.run(req);
			if (result.errors.length) break;
		}

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		let error = errors.array()[0];
		res.status(400).json({ msg: error.msg, type: 'JOI error' });
	};
};

module.exports = requestValidator;
