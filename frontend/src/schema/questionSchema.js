import * as Yup from 'yup';

let schema = Yup.object({
	question: Yup.string().required('Question is required'),
	optionType: Yup.string().required('Option Type is required'),
	questionMark: Yup.number().required('Question marks is required'),
});

export default schema;
