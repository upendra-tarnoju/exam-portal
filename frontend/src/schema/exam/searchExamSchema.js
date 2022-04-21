import * as Yup from 'yup';

const schema = Yup.object({
	name: Yup.string(),
	startDate: Yup.string(),
	endDate: Yup.string(),
	status: Yup.string(),
});

export default schema;
