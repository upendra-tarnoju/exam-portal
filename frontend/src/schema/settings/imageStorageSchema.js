import * as Yup from 'yup';

let schema = Yup.object({
	apiKey: Yup.string().required('Service name is required'),
	authDomain: Yup.string().required('Email is required'),
	projectID: Yup.string().required('Service name is required'),
	storageBucket: Yup.string().required('Storage bucket is required'),
	messageSenderID: Yup.string().required('Message sender ID is required'),
	appId: Yup.string().required('App ID is required'),
	measurementID: Yup.string().required('Measurement ID is required'),
});

export default schema;
