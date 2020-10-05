import * as Yup from 'yup';

let schema = Yup.object({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	// mobileNumber: Yup.string()
	// 	.matches(/^[89][0-9]{9}/, 'Invalid mobile number')
	// 	.required('Mobile number is required'),
	email: Yup.string()
		.email('Invalid Email address')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Minimum password length should be 6')
		.required('Password is required'),
	fatherName: Yup.string().required('Father name is required'),
	motherName: Yup.string().required('Mother name is required'),
	dob: Yup.string().required('Date of birth is required'),
	address: Yup.string().required('Address is required'),
	examCode: Yup.string().required('Exam code is required'),
});

export default schema;
