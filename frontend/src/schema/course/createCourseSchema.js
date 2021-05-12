import * as Yup from 'yup';

let schema = Yup.object({
	// name: Yup.string().required('Course name is required'),
	name: Yup.object()
		.shape({
			_id: Yup.string(),
			name: Yup.string(),
			description: Yup.string(),
		})
		.required('Course name is required')
		.nullable(),
	description: Yup.string().required('Description is required'),
});

export default schema;
