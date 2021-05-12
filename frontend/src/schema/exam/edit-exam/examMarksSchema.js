import * as Yup from 'yup';

const schema = Yup.object({
	totalMarks: Yup.number().min(1).required('Total marks is required'),
	passingMarks: Yup.string()
		.required('Passing marks is required')
		.test(
			'invalidPassingMark',
			'Passing marks cannot be greater than total marks',
			function (value) {
				let { totalMarks } = this.parent;

				if (value < totalMarks) return true;
				else return false;
			}
		),
	negativeMarks: Yup.string().required('Negative marks is required'),
});

export default schema;
