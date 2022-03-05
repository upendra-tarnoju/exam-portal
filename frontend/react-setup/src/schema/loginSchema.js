import * as Yup from 'yup';

let schema = Yup.object({
	email: Yup.string().required('Email is required'),
	password: Yup.string().required('Password is required'),
	rememberMe: Yup.bool(),
});

export default schema;
