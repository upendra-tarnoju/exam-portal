import * as Yup from 'yup';

const schema = Yup.object({
	course: Yup.string().required('Course is required'),
	examCode: Yup.string().required('Exam code is required'),
	subject: Yup.string().required('Subject is required'),
});

export default schema;
