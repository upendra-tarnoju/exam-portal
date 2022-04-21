import * as Yup from 'yup';

const schema = Yup.object({
	name: Yup.string(),
	email: Yup.string(),
	status: Yup.string(),
});

export default schema;
