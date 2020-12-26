import * as Yup from 'yup';

const schema = Yup.object().shape({
	currentPassword: Yup.string().required('Required field'),
	newPassword: Yup.string()
		.required('Required field')
		.min(6, 'Minimum password length should be 6'),
	reTypePassword: Yup.string().oneOf(
		[Yup.ref('newPassword'), null],
		'Password must match'
	),
});

export default schema;
