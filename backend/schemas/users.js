const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
	},
	email: {
		type: String,
		required: [true, 'Email ID is required'],
		validate: {
			validator: (email) => {
				return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
			},
			message: 'Invalid Email ID',
		},
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Minimum length of password should be 6'],
	},
	mobileNumber: {
		type: String,
	},
	accountType: {
		type: String,
		required: [true, 'Account type is required'],
	},
	lastLogin: {
		type: Date,
		default: null,
	},
	institution: {
		type: String,
	},
	userDataId: {
		type: Schema.Types.ObjectId,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('users', users);
