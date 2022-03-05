import * as Yup from 'yup';

let schema = Yup.object({
	new: Yup.string().required('Required Field'),
	confirm: Yup.string()
		.required('Required Field')
		.oneOf([Yup.ref('new'), null], 'Passwords must match'),
});

export default schema;
