import * as Yup from 'yup';

let schema = Yup.object({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	mobileNumber: Yup.string()
		.matches(/^[89][0-9]{9}/, 'Invalid mobile number')
		.required('Mobile number is required'),
	email: Yup.string()
		.email('Invalid Email address')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Minimum password length should be 6')
		.required('Password is required'),
	accountType: Yup.string()
		.required('Account type is required')
		.oneOf(['student', 'examiner'], 'Invalid account type'),
});

export default schema;
