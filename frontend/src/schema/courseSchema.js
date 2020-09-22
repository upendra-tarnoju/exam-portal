import * as Yup from 'yup';

let schema = Yup.object({
	name: Yup.string().required('Course name is required'),
	description: Yup.string().required('Description is required'),
});

export default schema;
