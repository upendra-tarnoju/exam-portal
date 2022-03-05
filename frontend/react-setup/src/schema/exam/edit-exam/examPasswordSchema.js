import * as Yup from 'yup';

const schema = Yup.object({
	newPassword: Yup.string()
		.required('New password is required')
		.min(6, 'Minimum password length should be 6'),
	confirmPassword: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export default schema;
