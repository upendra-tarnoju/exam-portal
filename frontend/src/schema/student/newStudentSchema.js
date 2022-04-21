import * as Yup from 'yup';

let schema = Yup.object({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	fatherName: Yup.string().required('Father name is required'),
	motherName: Yup.string().required('Mother name is required'),
	address: Yup.string().required('Address is required'),
	city: Yup.string().required('City is required'),
	state: Yup.string().required('State is required'),
	email: Yup.string()
		.email('Invalid Email address')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Minimum password length should be 6')
		.required('Password is required'),
	gender: Yup.string().required('Gender is required'),
	mobileNumber: Yup.string()
		.matches(/^[89][0-9]{9}/, 'Invalid mobile number')
		.required('Mobile number is required'),

	dob: Yup.string().required('Date of birth is required'),
	studentId: Yup.string().required('Student ID is required'),
});

export default schema;
