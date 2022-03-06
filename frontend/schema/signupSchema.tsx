import * as Yup from "yup";

const schema  = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: Yup.string().required('Mobile number is required').matches(/(0|91)?[7-9][0-9]{9}/),
  password: Yup.string().required('Password is required'),
});

export default schema;