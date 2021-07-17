import * as Yup from 'yup';

let schema = Yup.object({
	smtpServiceName: Yup.string().required('Service name is required'),
	smtpSenderEmail: Yup.string()
		.email('Invalid Email address')
		.required('Email is required'),
	smtpAPIKey: Yup.string().required('Service name is required'),
});

export default schema;
