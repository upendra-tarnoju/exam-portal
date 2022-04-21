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
});

export default schema;
