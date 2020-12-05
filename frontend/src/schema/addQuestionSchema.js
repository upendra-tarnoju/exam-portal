import * as Yup from 'yup';

let schema = Yup.object({
	question: Yup.string().required('Question is required'),
	optionType: Yup.string().required('Option Type is required'),
	totalOptions: Yup.string().required('Total Option is required'),
	option1: Yup.string().required('Option is required'),
	option2: Yup.string().required('Option is required'),
	option3: Yup.string().required('Option is required'),
	option4: Yup.string().required('Option is required'),
	option5: Yup.string().required('Option is required'),
	option6: Yup.string().required('Option is required'),
	correctAnswer: Yup.array()
		.min(1, 'Correct Answer is required')
		.of(
			Yup.object().shape({
				label: Yup.string().required(),
				value: Yup.string().required(),
			})
		),
});

export default schema;
