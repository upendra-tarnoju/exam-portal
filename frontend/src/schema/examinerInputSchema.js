import * as Yup from 'yup';

let schema = Yup.object({
	collegeName: Yup.string().required('College name is required'),
	designation: Yup.string().required('Designation is required'),
	department: Yup.string().required('Department is required'),
});

export default schema;
