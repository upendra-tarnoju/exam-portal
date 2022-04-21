import * as Yup from 'yup';

const schema = Yup.object({
	password: Yup.string().required('Required'),
});

export default schema;
