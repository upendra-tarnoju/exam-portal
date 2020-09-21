import * as Yup from 'yup';

let schema = Yup.object({
	subject: Yup.string().required('Subject is required'),
	examCode: Yup.string().required('Exam code is required'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Minimum password length should be 6'),
});

export default schema;
