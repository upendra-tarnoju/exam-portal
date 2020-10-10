import * as Yup from 'yup';

let schema = Yup.object({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	fatherName: Yup.string().required('Father name is required'),
	motherName: Yup.string().required('Mother name is required'),
	address: Yup.string().required('Address is required'),
	gender: Yup.string().required('Gender is required'),
});

export default schema;
