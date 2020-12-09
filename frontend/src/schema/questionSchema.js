import * as Yup from 'yup';

let initialSchema = {
	question: Yup.string().required('Question is required'),
	optionType: Yup.string().required('Option Type is required'),
	totalOptions: Yup.string().required('Total Option is required'),
	correctAnswer: Yup.array()
		.min(1, 'Correct Answer is required')
		.of(
			Yup.object()
				.shape({
					label: Yup.string(),
					value: Yup.string(),
				})
				.nullable()
		)
		.nullable(),
};

export default initialSchema;
